// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useBreakpoint from './UseBreakpoint.hook'



/**
 * Hook descriptions
 *
 * @example
 * const { result } = renderHook(() => useCounter())
 *
 * act(() => {
 *   result.current.increment()
 * })
 *
 * expect(result.current.count).toBe(1)
 */
describe('[useBreakpoint] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useBreakpoint())

    expect(result.current).toBe(null)
  })
})
