// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useHistory from './UseHistory.hook'


describe('[useHistory] hook', () => {
  it('should init snapshot history with undefined as first value', () => {
    const { result } = renderHook(() => useHistory())

    expect(result.current.value).toEqual(undefined)
  })

  it('should navigate by history', () => {
    const { result } = renderHook(() => useHistory(1))

    result.current.push(2)
    result.current.push(3)

    expect(result.current.value).toEqual(3)
    expect(result.current.hasPrev).toEqual(true)
    expect(result.current.hasNext).toEqual(false)

    result.current.prev()

    expect(result.current.value).toEqual(2)
    expect(result.current.hasPrev).toEqual(true)
    expect(result.current.hasNext).toEqual(true)

    result.current.prev()

    expect(result.current.value).toEqual(1)
    expect(result.current.hasPrev).toEqual(false)
    expect(result.current.hasNext).toEqual(true)

    result.current.next()

    expect(result.current.value).toEqual(2)

    result.current.next()

    expect(result.current.value).toEqual(3)
  })

  it('should not throw error if there is no previous and next values during navigation', () => {
    const { result } = renderHook(() => useHistory(1))

    result.current.next()

    expect(result.current.value).toEqual(1)

    result.current.prev()

    expect(result.current.value).toEqual(1)
  })

  it('should reset history with init value', () => {
    const { result } = renderHook(() => useHistory(1))

    result.current.push(2)
    result.current.push(3)

    result.current.reset()

    expect(result.current.value).toEqual(1)
  })

  it('should reset history with passed value', () => {
    const { result } = renderHook(() => useHistory(1))

    result.current.push(2)
    result.current.push(3)

    result.current.reset(5)

    expect(result.current.value).toEqual(5)
  })
})
