import test from 'ava'
import hydrate, { hydrateReducer } from '../src/hydrate'
import store from '../src/store'

import { ignoreUnknownActions } from './helpers/reducer.js'

test('hydrate llama a dispatch para remplazar de forma correcta', t => {
  const dispatch = store.dispatch
  store.dispatch = action => {
    t.deepEqual(action, {
      type: '@hacknlove/reduxplus/hydrate/replace',
      state: {
        foo: 'bar'
      }
    })
  }

  hydrate({ foo: 'bar' }, true)
  store.dispatch = dispatch
})

test('hydrate llama a dispatch para mezclar de forma correcta', t => {
  const dispatch = store.dispatch
  store.dispatch = action => {
    t.deepEqual(action, {
      type: '@hacknlove/reduxplus/hydrate/merge',
      state: {
        foo: 'bar'
      }
    })
  }

  hydrate({ foo: 'bar' })
  store.dispatch = dispatch
})

test('hydrateReducer ', t => ignoreUnknownActions(hydrateReducer, t))

test('hydrateReducer replaces the state if the actions says so', t => {
  const oldState = {
    wer: 567
  }
  const action = {
    type: '@hacknlove/reduxplus/hydrate/replace',
    state: {
      kjmtyhu: 'dfvghlbikj'
    }
  }
  const newState = hydrateReducer(oldState, action)
  t.deepEqual(newState, {
    kjmtyhu: 'dfvghlbikj'
  })
})

test('hydrateReducer merges the state if the actions says so', t => {
  const oldState = {
    wer: 567
  }
  const action = {
    type: '@hacknlove/reduxplus/hydrate/merge',
    state: {
      kjmtyhu: 'dfvghlbikj'
    }
  }
  const newState = hydrateReducer(oldState, action)
  t.deepEqual(newState, {
    wer: 567,
    kjmtyhu: 'dfvghlbikj'
  })
})
