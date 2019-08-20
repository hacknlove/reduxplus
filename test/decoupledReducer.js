import test from 'ava'
import { reducers, decoupledReducer, setReducer } from '../src/decoupledReducer'

test.serial('setReducer adds a new reducer', t => {
  const reducersLength = reducers.length
  const newReducer = (state, action) => state
  setReducer(newReducer)
  t.is(reducers.length, reducersLength + 1)

  t.is(reducers[reducersLength], newReducer)
})

test.serial('decoupledReducer calls every reducer, passing to the current one the previous one state', t => {
  const originalState = 'original'
  setReducer((state, action) => {
    t.is(state, originalState)
    return 'first'
  })
  setReducer((state, action) => {
    t.is(state, 'first')
    return 'second'
  })
  setReducer((state, action) => {
    t.is(state, 'second')
    return 'third'
  })
  setReducer((state, action) => {
    t.is(state, 'third')
    return 'fourth'
  })

  const finalState = decoupledReducer(originalState, {})

  t.is(finalState, 'fourth')
})
