# reduxplus

Decoupled redux, for react functional components.

## Example

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import store from 'reduxplus'

store.hydrate({
  worldName: 'world'
  foo: {
    bar: {
      buz: 42
    }
  }
})

store.setReducer((state, action) => {
  if (action.type !== 'setWorld') {
    return state
  }
  return {
    ...state,
    worldName: action.worldName
  }
})

function Example () {
  const worldName = store.useRedux('worldName')
  const theMeaningOfLife = store.useRedux('foo.bar.buz')

  return (
    <h1>Hello {world}</h1>
    <h2>The meaning of life is {theMeaningOfLife}</h2>
    <button onClick={() => store.dispatch({
      type: 'setWorld',
      worldName: 'Earth'
    })}>World's name</button>
  )
}

ReactDOM.render(
  <Example/>,
  document.querySelector('#root')
)
```
## API

### `store`
The redux store

### `setReducer(reducer)`
Adds a new reducer to the store

### `setMiddleware(middleware)`
Adds a new middleware to the store

### `useRedux(key?)`
`key` can be dot-composed

```javascript
const data = useRedux() // returns store.getState() and actualizes the component when data changes

const foobar = useRedux('foo.bar') // returns store.getState().foo.bar, and actualizes the component when that value changes
```

### hydrate(state, replace = false)

Set the store value

```javascript
// store.getValue() -> {foo: 'bar'}

hydrate({
  buz: 42
})

// store.getValue() -> {foo: 'bar', buz: 42}

hydrate({import { store, setReducer, setMiddleware, useRedux, hydrate } from 'reduxplus'

  foo: 'foooo'
})

// store.getValue() -> {foo: 'foooo', buz: 42}

hydrate({
  bar: 40
}, true)

// store.getValue() -> {bar: 42}

```

## subStores

to decouple more and better.

You will see the actions in redux devTools as `__/key/type`

```javascript
```

```javascript
import { subStore } from 'reduxplus'

const sub = subStore('foo.bar')

sub.getState() // returns {foo: { bar: THIS } }
sub.useRedux('buz') // like useRedux('foo.bar.buz')
sub.useRedux() // like useRedux('foo.bar')
sub.subscribe(listener) // Only called when some {foo: {bar: HERE }} changes
sub.hydrate(state) // set the value of {foo: { bar: THIS } }
sub.dispatch(action) // action that only is procesed by the reducers of this sub
sub.dispatch({type: 'someType', ...})
sub.setReducer(reducer) // reducer that only affects {foo: {bar: HERE }}
sub.subStore('tra.ree') // returns a subSubStore
sub.clean() // cleans up the sub's subscriptions and reducers
sub.clean(true) // cleans up the sub's subscriptions, reducers, and data
```

## Caution

Not every feature has been tested and only a subset of them is being used in production.

If you find some bug, please raise a new issue.
