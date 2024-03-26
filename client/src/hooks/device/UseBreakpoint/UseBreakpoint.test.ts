// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useBreakpoint from './UseBreakpoint.hook'


describe('[useBreakpoint] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useBreakpoint())

    expect(result.current).toEqual(null)
  })
})
