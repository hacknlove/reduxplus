import test from 'ava'
import getValue from '../src/getValue'

test('getValue returns undefined if the key does not exists', t => {
  t.is(getValue({}, 'foo'), undefined)
})

test('getValue returns the value whe the key has not dot', t => {
  const state = {
    foo: 'bar'
  }
  const key = 'foo'
  t.is(getValue(state, key), state.foo)
})

test('getValue returns the value when the key has dot', t => {
  const state = {
    foo: {
      bar: 'buz'
    }
  }
  const key = 'foo.bar'
  t.is(getValue(state, key), state.foo.bar)
})

test('getValue returns undefined when the dotted key has value', t => {
  const state = {
    foo: {
      bar: 'buz'
    }
  }
  const key = 'foo.wrong'
  t.is(getValue(state, key), undefined)
})

test('getValue returns the value when the key has dot and many levels', t => {
  const state = {
    foo: {
      bar: {
        ewrt: {
          tuy: {
            tyu: true
          }
        }
      }
    }
  }
  const key = 'foo.bar.ewrt.tuy.tyu'
  t.is(getValue(state, key), true)
})
