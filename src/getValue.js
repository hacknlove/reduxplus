const dotRegExp = /^(.+?)\.(.*)/

/**
 * Devuelve el valor detrás de una key compuesta por puntos, para un estado
 * @param {*} state
 * @param {*} key
 */
function getValue (state, key) {
  if (!state) {
    return state
  }
  if (state[key] !== undefined) {
    return state[key]
  }
  const dots = key.match(dotRegExp)
  if (!dots) {
    return undefined
  }
  return getValue(state[dots[1]], dots[2])
}

module.exports = getValue
