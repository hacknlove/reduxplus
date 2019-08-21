import test from 'ava'
import { renderHook } from '@testing-library/react-hooks'
import store from '../src'

test.afterEach.always.cb(t => {
  t.context.unmount()
  setTimeout(t.end, 500)
})

test.serial('useRedux devuelve el state completo si la key es undefined', async t => {
  store.hydrate({
    foo: 'bar'
  }, true)

  const { result, unmount } = renderHook(() => store.useRedux())
  t.context.unmount = unmount

  t.deepEqual(result.current, {
    foo: 'bar'
  })
})

test.serial('useRedux devuelve el valor correspondiente a la key', async t => {
  store.hydrate({
    foo: 'bar'
  }, true)

  const { result, unmount } = renderHook(() => store.useRedux('foo'))
  t.context.unmount = unmount

  t.is(result.current, 'bar')
})

test.serial('useRedux refresca el componente cuando cambia el state y key es undefined', async t => {
  store.hydrate({
    foo: 'bar'
  }, true)

  const { result, unmount, waitForNextUpdate } = renderHook(() => store.useRedux('foo'))
  t.context.unmount = unmount

  t.is(result.current, 'bar')
  const wait = waitForNextUpdate()
  store.hydrate({
    foo: 'lkjdfg'
  })
  await wait
  t.is(result.current, 'lkjdfg')
})

test.serial('useRedux refresca el componente cuando cambia el valor de la key', async t => {
  store.hydrate({
    foo: {
      dfgh: true
    }
  }, true)

  const { result, unmount, waitForNextUpdate } = renderHook(() => store.useRedux('foo.dfgh'))
  t.context.unmount = unmount

  t.true(result.current)
  const wait = waitForNextUpdate()

  store.hydrate({
    foo: 'tdyu'
  }, true)
  await wait
  t.is(result.current, undefined)

  store.hydrate({
    foo: {
      dfgh: false
    }
  }, true)
  await wait
  t.false(result.current)

  store.hydrate({
    foo: {
      dfgh: 'kljhdfg'
    }
  }, true)
  await wait
  t.is(result.current, 'kljhdfg')
})

test.serial('useRedux no refresca el componente cuando cambia el state, pero no el valor de la key', async t => {
  store.hydrate({
    foo: {
      dfgh: true
    }
  }, true)

  const { result, unmount, waitForNextUpdate } = renderHook(() => store.useRedux('foo.dfgh'))
  t.context.unmount = unmount

  t.is(result.current, true)
  const wait = waitForNextUpdate()

  var pass = false

  store.hydrate({
    kjhsdf: 'loiudfg'
  })

  setTimeout(() => {
    pass = true
    store.hydrate({}, true)
  }, 100)

  await wait

  t.true(pass, 'ha refrescado antes de tiempo')
})
