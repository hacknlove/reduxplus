const isDifferent = require('isdifferent')
const store = require('./store')
const { getValue } = require('@hacknlove/deepobject')

function subscribeKey (key, callback) {
  var value = getValue(store.getState(), key)
  callback(value)

  return store.subscribe(() => {
    const newValue = getValue(store.getState(), key)
    if (isDifferent(value, newValue)) {
      value = newValue
      callback(newValue)
    }
  })
}

module.exports = subscribeKey
