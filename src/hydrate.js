const store = require('./store')

function hydrate (state, replace = false) {
  if (replace) {
    return store.dispatch({
      type: '__reduxplus_hydrate__',
      replace: state
    })
  }
  store.dispatch({
    type: '__reduxplus_hydrate__',
    state
  })
}

module.exports = hydrate
