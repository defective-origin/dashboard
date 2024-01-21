// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useBreakpoints from './UseBreakpoints.hook'



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
describe('[useBreakpoints] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useBreakpoints())

    expect(result.current).toBe(null)
  })
})
