const { useEffect } = require('react')
const store = require('./store')

module.exports = function useSubStore (key, data) {
  const sub = store.subStore(key)

  useEffect(() => {
    return sub.cleanDebounced(500, data)
  })
}
