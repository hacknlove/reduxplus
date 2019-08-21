const { useState, useEffect } = require('react')
const isDifferent = require('isdifferent')
const store = require('./store')
const getValue = require('./getValue')

/**
 * hook que devuelve el state del store, se usa cómo helper de useRedux
 */
function useReduxFull () {
  const [value, set] = useState(store.getState())
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const newValue = store.getState()
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

/**
 * hook para react que devuelve el valor de una key en el store de redux
 * @param {*} key
 */
function useRedux (key) {
  if (key === undefined) {
    return useReduxFull()
  }
  const [value, set] = useState(getValue(store.getState(), key))
  useEffect(() => {
    return store.subscribe(() => {
      const newValue = getValue(store.getState(), key)
      console.log('x'.repeat(50), store.getState(), key, newValue)
      if (isDifferent(value, newValue)) {
        set(newValue)
      }
    })
  })
  return value
}

module.exports = useRedux
