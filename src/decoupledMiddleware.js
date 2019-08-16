const { compose } = require('redux')

const middlewares = []

var store

const middlewareAPI = {
  getState () { return {} },
  dispatch () {
    throw new Error(
      'Dispatching while constructing your middleware is not allowed. ' +
        'Other middleware would not be applied to this dispatch.'
    )
  }
}

function setMiddleware (middleware) {
  middlewares.push(middleware(middlewareAPI))
  middlewareAPI.dispatch = compose(...middlewares)(store.dispatch)
}

var decoupledMiddleware = function decoupledMiddleware (createStore) {
  return function (...args) {
    store = createStore(...args)
    middlewareAPI.getState = store.getState
    middlewareAPI.dispatch = store.dispatch

    return {
      ...store,
      dispatch (...args) {
        middlewareAPI.dispatch(...args)
      }
    }
  }
}

if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  decoupledMiddleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(decoupledMiddleware)
}

exports.decoupledMiddleware = decoupledMiddleware
exports.setMiddleware = setMiddleware
