const { setMiddleware } = require('./decoupledMiddleware')
const { setReducer } = require('./decoupledReducer')
const useRedux = require('./useRedux')
const hydrate = require('./hydrate')
const store = require('./store')
const subStore = require('./subStore')
const subscribeKey = require('./subscribeKey')

store.setReducer = setReducer
store.setMiddleware = setMiddleware
store.hydrate = hydrate
store.useRedux = useRedux
store.subStore = subStore
store.subscribeKey = subscribeKey

module.exports = store
