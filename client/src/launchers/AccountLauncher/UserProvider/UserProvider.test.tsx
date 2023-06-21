// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useUserProvider } from './UserProvider.context'
import UserProvider, { UserProviderProps } from './UserProvider.component'

/**
 * Context descriptions
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
describe('[UserProvider] context', () => {
  const wrapper = (props: UserProviderProps) => <UserProvider { ...props } />

  it('should return context', () => {
    const { result } = renderHook(() => useUserProvider(), { wrapper })
  
    expect(result.current).toBe(null)
  })
})
