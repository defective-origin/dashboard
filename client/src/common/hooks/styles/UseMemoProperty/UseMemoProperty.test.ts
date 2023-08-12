// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useMemoProperty from './UseMemoProperty.hook'



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
describe('[useMemoProperty] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useMemoProperty())

    expect(result.current).toBe(null)
  })
})
