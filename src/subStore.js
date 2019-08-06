const store = require('./store')
const getValue = require('./getValue')
const setValue = require('./setValue')
const isDifferent = require('isdifferent')
class SubStore {
  constructor (key) {
    this.key = key
  }

  getState () {
    return getValue(store.getState(), this.key)
  }

  setReducer (reducer) {
    store.setReducer((state, action) => {
      if (action.type !== '__reduxplus_subStore') {
        return state
      }
      if (action.__reduxplus_subStore_key !== this.key) {
        return state
      }
      return setValue(state, this.key, reducer(getValue(state, this.key), action.action))
    })
  }

  dispatch (action) {
    store.dispatch({
      type: '__reduxplus_subStore',
      __reduxplus_subStore_key: this.key,
      action
    })
  }

  useRedux (key) {
    return store.useRedux(`${this.key}.${key}`)
  }

  subscribe (listener) {
    var current = this.getState()
    return store.subscribe(() => {
      var newValue = this.getState()
      if (isDifferent(current, newValue)) {
        current = newValue
        listener()
      }
    })
  }

  hydrate (newState, replace = false) {
    if (!replace) {
      newState = {
        ...this.getState(),
        ...newState
      }
    }
    store.hydrate(setValue(store.getState(), this.key, newState))
  }

  subStore (key) {
    return new SubStore(`${key}.${this.key}`)
  }
}

function subStore (key) {
  return new SubStore(key)
}

module.exports = subStore
