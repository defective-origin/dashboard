// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import RouterProvider, { RouterProviderProps } from './RouterProvider.component'

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
describe('[RouterProvider] context', () => {
  const wrapper = (props: RouterProviderProps) => <RouterProvider { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => ({ current: null }), { wrapper })
  
    expect(result.current.current).toBe(null)
  })
})
