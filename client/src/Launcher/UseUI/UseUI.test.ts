// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useUI from './UseUI.hook'



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
describe('[useUI] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useUI())

    expect(result.current).toBe(null)
  })
})
