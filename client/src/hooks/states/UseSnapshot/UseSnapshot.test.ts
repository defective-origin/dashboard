// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useSnapshot from './UseSnapshot.hook'



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
describe('[useSnapshot] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useSnapshot())

    expect(result.current).toBe(null)
  })
})
