const store = require('./store')
const { setReducer } = require('./decoupledReducer')

/**
 * Hydrates the store, mergind or replacing a state (dispatch a hydrate action)
 * @param {*} state
 * @param {*} replace
 */
function hydrate (state, replace = false) {
  store.dispatch({
    type: `@hacknlove/reduxplus/hydrate/${replace ? 'replace' : 'merge'}`,
    state
  })
}

/**
 * Reducer that hydrates the store
 *
 * @param {*} state
 * @param {*} action
*/
function hydrateReducer (state, action) {
  switch (action.type) {
    case '@hacknlove/reduxplus/hydrate/replace':
      return action.state
    case '@hacknlove/reduxplus/hydrate/merge':
      return action.replace || {
        ...state,
        ...action.state
      }
    default:
      return state
  }
}

setReducer(hydrateReducer)

module.exports = hydrate

if (process.env.NODE_ENV === 'test') {
  hydrate.hydrateReducer = hydrateReducer
}
