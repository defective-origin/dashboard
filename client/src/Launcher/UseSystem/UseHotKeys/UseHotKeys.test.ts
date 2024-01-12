// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useHotKeys from './UseHotKeys.hook'



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
describe('[useHotKeys] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useHotKeys())

    expect(result.current).toBe(null)
  })
})
