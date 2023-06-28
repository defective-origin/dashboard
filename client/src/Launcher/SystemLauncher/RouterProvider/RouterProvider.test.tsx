// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useRouterProvider } from './RouterProvider.context'
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
    const { result } = renderHook(() => useRouterProvider(), { wrapper })
  
    expect(result.current).toBe(null)
  })
})
