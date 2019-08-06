const { setMiddleware } = require('./decoupledMiddleware')
const { setReducer } = require('./decoupledReducer')
const useRedux = require('./useRedux')
const hydrate = require('./hydrate')
const store = require('./store')
const subStore = require('./subStore')

store.setReducer = setReducer
store.setMiddleware = setMiddleware
store.hydrate = hydrate
store.useRedux = useRedux
store.subStore = subStore

module.exports = store
