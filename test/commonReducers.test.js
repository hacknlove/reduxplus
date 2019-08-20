import test from 'ava'
import { set, update, push, addToSet } from '../src/commonReducers'

test('set return state, (and it has not changed!) if the action has not type set', t => {
  const oldState = {
    wer: 'oeirt'
  }

  const action = {
    type: 'other'
  }

  const newState = set({ ...oldState }, action)

  t.deepEqual(oldState, newState)
})

test('set returns a new state, with {..., key=value}', t => {
  const oldState = {
    wer: 'oeirt'
  }

  const action = {
    type: 'set',
    key: 'foo',
    value: 'bar'
  }

  const newState = set({ ...oldState }, action)
  t.deepEqual({ ...oldState, foo: 'bar' }, newState)
})

test('update return state, (and it has not changed!) if the action has not type update', t => {
  const oldState = {
    wer: 'oeirt'
  }

  const action = {
    type: 'other'
  }

  const newState = update({ ...oldState }, action)

  t.deepEqual(oldState, newState)
})

test('update returns a new state, with {..., key=value}', t => {
  const oldState = {
    wer: 'oeirt',
    foo: {
      bar: true
    }
  }

  const action = {
    type: 'update',
    key: 'foo',
    value: {
      baz: false
    }
  }

  const newState = update(oldState, action)
  t.deepEqual({
    wer: 'oeirt',
    foo: {
      bar: true,
      baz: false
    }
  }, newState)
})

test('push return state, (and it has not changed!) if the action has not type push', t => {
  const oldState = {
    wer: 'oeirt',
    foo: []
  }

  const action = {
    type: 'other'
  }

  const newState = push({ ...oldState }, action)

  t.deepEqual(oldState, newState)
})

test('push return a new state with the value pushed in the array', t => {
  const oldState = {
    wer: 'oeirt',
    foo: ['something']
  }

  const action = {
    type: 'push',
    key: 'foo',
    value: 'newthing'
  }

  const newState = push(oldState, action)

  t.deepEqual({
    wer: 'oeirt',
    foo: ['something', 'newthing']
  }, newState)
})

test('push returns a new state with a new array under key, if it was undefined', t => {
  const oldState = {
    ertfyg: 'eiurth'
  }
  const action = {
    type: 'push',
    key: 'foo',
    value: 'newthing'
  }

  const newState = push(oldState, action)

  t.deepEqual(newState, {
    ertfyg: 'eiurth',
    foo: ['newthing']
  })
})

test('addToSet return state, (and it has not changed!) if the action has not type addToSet', t => {
  const oldState = {
    wer: 'oeirt',
    foo: []
  }

  const action = {
    type: 'other'
  }

  const newState = addToSet({ ...oldState }, action)

  t.deepEqual(oldState, newState)
})

test('addToSet return a new state with the value pushed in the array, if it is not included', t => {
  const oldState = {
    wer: 'oeirt',
    foo: ['something']
  }

  const action = {
    type: 'addToSet',
    key: 'foo',
    value: 'newthing'
  }

  const newState = addToSet(oldState, action)

  t.deepEqual({
    wer: 'oeirt',
    foo: ['something', 'newthing']
  }, newState)
})

test('addToSet return a new state with the value NOT pushed in the array, if it IS included', t => {
  const oldState = {
    wer: 'oeirt',
    foo: ['something', 'newthing']
  }

  const action = {
    type: 'addToSet',
    key: 'foo',
    value: 'newthing'
  }

  const newState = addToSet(oldState, action)

  t.deepEqual({
    wer: 'oeirt',
    foo: ['something', 'newthing']
  }, newState)
})

test('addToSet returns a new state with a new array under key, if it was undefined', t => {
  const oldState = {
    ertfyg: 'eiurth'
  }
  const action = {
    type: 'addToSet',
    key: 'foo',
    value: 'newthing'
  }

  const newState = addToSet(oldState, action)

  t.deepEqual(newState, {
    ertfyg: 'eiurth',
    foo: ['newthing']
  })
})
