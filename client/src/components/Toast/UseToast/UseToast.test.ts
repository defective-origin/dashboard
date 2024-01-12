// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useToast from './UseToast.hook'



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
describe('[useToast] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useToast())

    expect(result.current).toBe(null)
  })
})
