const { createStore } = require('redux')
const { setMiddleware, decoupledMiddleware } = require('./decoupledMiddleware')
const { setReducer, decoupledReducer } = require('./decoupledReducer')

const store = createStore(decoupledReducer, {}, decoupledMiddleware)
store.setMiddleware = setMiddleware
store.setReducer = setReducer

module.exports = store
