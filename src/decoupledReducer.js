const reducers = [
  (state, action) => {
    if (action.type !== '__reduxplus_hydrate__') {
      return state
    }
    return action.replace || {
      ...state,
      ...action.state
    }
  }
]

function decoupledReducer (previousState = {}, action) {
  return reducers.reduce((state, reducer) => reducer(state, action), previousState)
}

function setReducer (reducer) {
  reducers.push(reducer)
}

exports.decoupledReducer = decoupledReducer
exports.setReducer = setReducer
