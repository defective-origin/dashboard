// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useProperty from './UseProperty.hook'



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
describe('[useProperty] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useProperty())

    expect(result.current).toBe(null)
  })
})
