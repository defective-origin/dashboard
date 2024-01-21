// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useProperties from './UseProperties.hook'



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
describe('[useProperties] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useProperties())

    expect(result.current).toBe(null)
  })
})
