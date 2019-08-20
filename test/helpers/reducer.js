exports.ignoreUnknownActions = function ignoreUnknownActions (reducer, t) {
  const oldState = {
    wer: 'oeirt'
  }

  const action = {
    type: ' 23oi854ykljsdfo89723'
  }

  const newState = reducer({ ...oldState }, action)

  t.deepEqual(oldState, newState)
}
