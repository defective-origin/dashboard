// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import scrollBar from './UseScrollBar.hook'



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
describe('[scrollBar] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => scrollBar())

    expect(result.current).toBe(null)
  })
})
