exports.set = (state, action) => {
  if (action !== 'set') {
    return state
  }
  return {
    ...state,
    [action.key]: action.value
  }
}

exports.update = (state, action) => {
  if (action !== 'update') {
    return state
  }

  return {
    ...state,
    [action.key]: {
      ...state[action.key],
      ...action.value
    }
  }
}

exports.push = (state, action) => {
  if (action !== 'push') {
    return state
  }

  return {
    ...state,
    [action.key]: [...state[action.key], action.value]
  }
}

exports.addToSet = (state, action) => {
  if (action !== 'addToSet') {
    return state
  }

  return {
    ...state,
    [action.key]: Array.from(new Set([...state[action.key], action.value]))
  }
}
