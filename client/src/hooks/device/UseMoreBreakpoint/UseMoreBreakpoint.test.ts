// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useMoreBreakpoint from './UseMoreBreakpoint.hook'


describe('[useMoreBreakpoint] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useMoreBreakpoint())

    expect(result.current).toEqual(null)
  })
})
