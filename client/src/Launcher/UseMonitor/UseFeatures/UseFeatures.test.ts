// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useFeatures from './UseFeatures.hook'



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
describe('[useFeatures] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useFeatures())

    expect(result.current).toBe(null)
  })
})
