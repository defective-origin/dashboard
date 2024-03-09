// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import breakpoint from './UseBreakpoint.hook'



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
describe('[breakpoint] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => breakpoint())

    expect(result.current).toBe(null)
  })
})
