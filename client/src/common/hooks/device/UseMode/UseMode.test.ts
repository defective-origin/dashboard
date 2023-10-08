// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useMode from './UseMode.hook'



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
describe('[useMode] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useMode())

    expect(result.current).toBe(null)
  })
})
