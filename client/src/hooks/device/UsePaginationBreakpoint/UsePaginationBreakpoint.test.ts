// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import usePaginationBreakpoint from './UsePaginationBreakpoint.hook'



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
describe('[usePaginationBreakpoint] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => usePaginationBreakpoint())

    expect(result.current).toBe(null)
  })
})
