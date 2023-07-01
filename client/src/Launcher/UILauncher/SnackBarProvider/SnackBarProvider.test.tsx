// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useSnackBarProvider } from './SnackBarProvider.context'
import SnackBarProvider, { SnackBarProviderProps } from './SnackBarProvider.component'

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
describe('[SnackBarProvider] context', () => {
  const wrapper = (props: SnackBarProviderProps) => <SnackBarProvider { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useSnackBarProvider(), { wrapper })
  
    expect(result.current).toBe(null)
  })
})
