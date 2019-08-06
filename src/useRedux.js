const { useState, useEffect } = require('react')
const isDifferent = require('isdifferent')
const store = require('./store')
const getValue = require('./getValue')

function useRedux (key) {
  const [value, set] = useState(getValue(store.getState(), key))
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const newValue = getValue(store.getState(), key)
      if (isDifferent(value, newValue)) {
        set(newValue)
      }
    })
    return () => {
      unsuscribe()
    }
  })
  return value
}

module.exports = useRedux
