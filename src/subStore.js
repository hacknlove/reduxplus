const store = require('./store')
const { getValue, setValue } = require('@hacknlove/deepobject')

store.subs = {}

const scope = {}

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
  if (!scope[action.key]) {
    return state
  }

  return setValue(
    state,
    action.key,
    scope[action.key].subReducers.reduce(
      (state, reducer) => reducer(state, action.action),
      getValue(state, action.key)
    )
  )
})

class SubStore {
  constructor (key) {
    this.key = key

    store.subs[key] = this
    scope[key] = {
      subReducers: [],
      subSubscriptions: []
    }
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
    scope[this.key].subReducers.push(reducer)
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
    scope[this.key].subSubscriptions.push(unsuscribe)
    return unsuscribe
  }

  subscribeKey (key, callback) {
    this.isNotForgotten()
    const unsuscribe = store.subscribeKey(`${this.key}.${key}`, callback)
    scope[this.key].subSubscriptions.push(unsuscribe)
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

  useSubStore (key, data) {
    this.isNotForgotten()
    return store.useSubStore(`${key}.${this.key}`, data)
  }

  cleanDebounced (timeout = 1000, data = false) {
    if (scope[this.key].clean) {
      clearTimeout(scope[this.key].clean)
    }
    scope[this.key].clean = setTimeout(() => {
      this.clean(data)
    }, timeout)
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
    scope[this.key].subSubscriptions.forEach(f => f())
    delete scope[this.key]
    delete store.subs[this.key]
  }
}

function subStore (key) {
  if (store.subs[key]) {
    if (scope[key].clean) {
      clearTimeout(scope[key].clean)
    }
    return store.subs[key]
  }

  return new SubStore(key)
}

module.exports = subStore
