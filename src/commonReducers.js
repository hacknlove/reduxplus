/**
 * A common reducer that sets a key to a value
 *
 * @params {*} state
 * @params {*} action
 *
 * Like every other reducer
 */
exports.set = (state, action) => { // tested
  if (action.type !== 'set') {
    return state
  }
  return {
    ...state,
    [action.key]: action.value
  }
}

/**
 * A common reducer that updates a key to a value. So value is an object, and you do not want ir replaced, but updated with the new value's keys.
 *
 * @params {*} state
 * @params {*} action
 *
 * Like every other reducer
 */
exports.update = (state, action) => { // tested
  if (action.type !== 'update') {
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

/**
 * A common reducer that push an element to an array
 */
exports.push = (state, action) => { // tested
  if (action.type !== 'push') {
    return state
  }

  if (state[action.key] === undefined) {
    return {
      ...state,
      [action.key]: [action.value]
    }
  }

  return {
    ...state,
    [action.key]: [...state[action.key], action.value]
  }
}

/**
 * A common reducer that push an element to an array, only if it is not yet included
 */
exports.addToSet = (state, action) => { // tested
  if (action.type !== 'addToSet') {
    return state
  }

  if (state[action.key] === undefined) {
    return {
      ...state,
      [action.key]: [action.value]
    }
  }

  if (state[action.key].includes(action.value)) {
    return state
  }

  return {
    ...state,
    [action.key]: [...state[action.key], action.value]
  }
}
