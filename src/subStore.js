const store = require('./store')
const getValue = require('./getValue')
const setValue = require('./setValue')

store.subs = {}

store.setReducer((state, action) => {
  if (!action.key) {
    return state
  }
  if (!action.action) {
    return state
  }
  if (!action.action.type) {
    return state
  }
  if (action.type !== `__/${action.key}/${action.action.type}`) {
    return state
  }
  if (action.clean) {
    const newState = {
      ...state
    }
    delete newState[action.key]
    return newState
  }
  if (!subReducers[action.key]) {
    return state
  }

  return setValue(
    state,
    action.key,
    subReducers[action.key].reduce(
      (state, reducer) => reducer(state, action.action),
      getValue(state, action.key)
    )
  )
})

const subReducers = {}
const subSubscriptions = {}

class SubStore {
  constructor (key) {
    this.key = key
  }

  getState () {
    if (store.subs[this.key]) {
      throw new Error('sub forgotten')
    }
    return getValue(store.getState(), this.key)
  }

  setReducer (reducer) {
    if (store.subs[this.key]) {
      throw new Error('sub forgotten')
    }
    subReducers[this.key].push(reducer)
  }

  dispatch (action) {
    if (store.subs[this.key]) {
      throw new Error('sub forgotten')
    }
    store.dispatch({
      type: `__/${this.key}/${action.type}`,
      key: this.key,
      action
    })
  }

  useRedux (key) {
    if (store.subs[this.key]) {
      throw new Error('sub forgotten')
    }
    return store.useRedux(`${this.key}.${key}`)
  }

  subscribe (callback) {
    if (store.subs[this.key]) {
      throw new Error('sub forgotten')
    }
    const unsuscribe = store.subscribeKey(`${this.key}`, callback)
    subSubscriptions[this.key].push(unsuscribe)
    return unsuscribe
  }

  subscribeKey (key, callback) {
    if (store.subs[this.key]) {
      throw new Error('sub forgotten')
    }
    const unsuscribe = store.subscribeKey(`${this.key}.${key}`, callback)
    subSubscriptions[this.key].push(unsuscribe)
    return unsuscribe
  }

  hydrate (newState, replace = false) {
    if (store.subs[this.key]) {
      throw new Error('sub forgotten')
    }
    if (!replace) {
      newState = {
        ...this.getState(),
        ...newState
      }
    }
    store.hydrate(setValue(store.getState(), this.key, newState))
  }

  subStore (key) {
    if (store.subs[this.key]) {
      throw new Error('sub forgotten')
    }
    return new SubStore(`${key}.${this.key}`)
  }

  forgot () {
    if (store.subs[this.key]) {
      throw new Error('sub forgotten')
    }
    delete store.subs[this.key]
    delete subReducers[this.key]
    subSubscriptions.forEach(f => f())
    delete subSubscriptions[this.key]
  }

  clean () {
    store.dispatch({
      type: `__/${this.key}/clean`,
      clean: true,
      action: {
        type: 'clean'
      }
    })
    this.forgot()
  }
}

function subStore (key) {
  if (store.subs[key]) {
    return store.subs[key]
  }

  store.subs[key] = new SubStore(key)
  subReducers[key] = []
  subSubscriptions[key] = []

  return store.subs[key]
}

module.exports = subStore
