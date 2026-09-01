// ---| tests |---
import { renderHook } from '@testing-library/react'

// ---| self |---
import useThrottle from './UseThrottle.hook'


describe('[useThrottle] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useThrottle(() => {}))

    expect(result.current).toEqual(expect.any(Function))
  })
})
