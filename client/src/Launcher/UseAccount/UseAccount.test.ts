// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useAccount from './UseAccount.hook'



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
describe('[useAccount] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useAccount())

    expect(result.current).toBe(null)
  })
})
