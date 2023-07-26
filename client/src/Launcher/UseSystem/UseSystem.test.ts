// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useSystem from './UseSystem.hook'



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
describe('[useSystem] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useSystem())

    expect(result.current).toBe(null)
  })
})
