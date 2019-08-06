const dotRegExp = /^(.+?)\.(.*)/

function setValue (previousState, key, value) {
  if (!previousState) {
    return setValue({}, key, value)
  }
  if (previousState[key]) {
    previousState[key] = value
    return previousState
  }
  const dots = key.match(dotRegExp)
  if (!dots) {
    previousState[key] = value
    return previousState
  }
  return {
    ...previousState,
    [dots[1]]: setValue(previousState[dots[1]], dots[2], value)
  }
}

module.exports = setValue
