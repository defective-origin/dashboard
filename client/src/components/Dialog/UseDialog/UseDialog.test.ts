// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useDialog from './UseDialog.hook'



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
describe('[useDialog] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useDialog())

    expect(result.current).toBe(null)
  })
})
