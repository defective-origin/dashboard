// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useMoreBreakpoint from './UseMoreBreakpoint.hook'



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
describe('[useMoreBreakpoint] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useMoreBreakpoint())

    expect(result.current).toBe(null)
  })
})