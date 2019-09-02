# reduxplus
![coverage 85%](https://img.shields.io/badge/coverage-85%25-brightgreen)

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

See [@hacknlove/substore](https://github.com/hacknlove/substore)

## test

```bash
git clone https://github.com/hacknlove/reduxplus.git
cd reduxplus
npm i
npm test
```
