// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useMonitor from './UseMonitor.hook'



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
describe('[useMonitor] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useMonitor())

    expect(result.current).toBe(null)
  })
})
