// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useTheme from './UseTheme.hook'



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
describe('[useTheme] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current).toBe(null)
  })
})
