// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useNestedState from './UseNestedState.hook'



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
describe('[useNestedState] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useNestedState())

    expect(result.current).toBe(null)
  })
})
