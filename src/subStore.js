const store = require('./store')
const getValue = require('./getValue')
const setValue = require('./setValue')

store.subs = {}
const subReducers = {}
const subSubscriptions = {}

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

class SubStore {
  constructor (key) {
    this.key = key

    store.subs[key] = this
    subReducers[key] = []
    subSubscriptions[key] = []
  }

  isNotForgotten () {
    if (!store.subs[this.key]) {
      // console.error('sub forgotten')
      throw new Error('sub forgotten')
    }
  }

  getState () {
    this.isNotForgotten()
    return getValue(store.getState(), this.key)
  }

  setReducer (reducer) {
    this.isNotForgotten()
    subReducers[this.key].push(reducer)
  }

  dispatch (action) {
    this.isNotForgotten()
    store.dispatch({
      type: `__/${this.key}/${action.type}`,
      key: this.key,
      action
    })
  }

  useRedux (key) {
    this.isNotForgotten()
    if (key === undefined) {
      return store.useRedux(this.key)
    }
    return store.useRedux(`${this.key}.${key}`)
  }

  subscribe (callback) {
    this.isNotForgotten()
    const unsuscribe = store.subscribeKey(`${this.key}`, callback)
    subSubscriptions[this.key].push(unsuscribe)
    return unsuscribe
  }

  subscribeKey (key, callback) {
    this.isNotForgotten()
    const unsuscribe = store.subscribeKey(`${this.key}.${key}`, callback)
    subSubscriptions[this.key].push(unsuscribe)
    return unsuscribe
  }

  hydrate (newState, replace = false) {
    this.isNotForgotten()
    if (!replace) {
      newState = {
        ...this.getState(),
        ...newState
      }
    }
    store.hydrate(setValue(store.getState(), this.key, newState))
  }

  subStore (key) {
    this.isNotForgotten()
    return new SubStore(`${key}.${this.key}`)
  }

  clean (data) {
    this.isNotForgotten()
    if (data) {
      store.dispatch({
        type: `__/${this.key}/clean`,
        clean: true,
        action: {
          type: 'clean'
        }
      })
    }
    delete store.subs[this.key]
    delete subReducers[this.key]
    subSubscriptions.forEach(f => f())
    delete subSubscriptions[this.key]
  }

}

function subStore (key) {
  if (store.subs[key]) {
    return store.subs[key]
  }

  return new SubStore(key)
}

module.exports = subStore
