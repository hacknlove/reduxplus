const reducers = []

/**
 * Execute sequentially all reducers, and returns the new state
 * @param {*} previousState
 * @param {*} action
 */
function decoupledReducer (previousState = {}, action) { // tested
  return reducers.reduce((state, reducer) => reducer(state, action), previousState)
}

/**
 * Adds a reducer
 * @param {function} reducer
 */
function setReducer (reducer) { // tested
  reducers.push(reducer)
}

exports.decoupledReducer = decoupledReducer
exports.setReducer = setReducer

if (process.env.NODE_ENV === 'test') {
  exports.reducers = reducers
}
