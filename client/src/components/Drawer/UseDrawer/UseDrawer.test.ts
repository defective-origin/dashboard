// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useDrawer from './UseDrawer.hook'



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
describe('[useDrawer] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useDrawer())

    expect(result.current).toBe(null)
  })
})
