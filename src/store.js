const { createStore } = require('redux')
const { decoupledMiddleware } = require('./decoupledMiddleware')
const { decoupledReducer } = require('./decoupledReducer')

const store = createStore(decoupledReducer, {}, decoupledMiddleware)

module.exports = store
