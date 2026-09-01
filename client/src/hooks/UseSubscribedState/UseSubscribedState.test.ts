// ---| tests |---
import { act, renderHook } from '@testing-library/react'

// ---| self |---
import useSubscribedState from './UseSubscribedState.hook'


describe('[useSubscribedState] hook', () => {
  it('should return value and setter', () => {
    const { result } = renderHook(() => useSubscribedState("value"))

    expect(result.current).toEqual(["value", expect.any(Function)])
  })

  it('should set new value if argument changes', () => {
    const { result, rerender } = renderHook((val = 1) => useSubscribedState(val))

    rerender(2)

    expect(result.current).toEqual([2, expect.any(Function)])
  })

  it('should set new value via setter', () => {
    const { result } = renderHook(() => useSubscribedState(1))

    act(() => result.current[1]?.(2) );

    expect(result.current).toEqual([2, expect.any(Function)])
  })
})
