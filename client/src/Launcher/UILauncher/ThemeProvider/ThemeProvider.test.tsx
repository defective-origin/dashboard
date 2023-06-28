// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useThemeProvider } from './ThemeProvider.context'
import ThemeProvider, { ThemeProviderProps } from './ThemeProvider.component'

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
describe('[ThemeProvider] context', () => {
  const wrapper = (props: ThemeProviderProps) => <ThemeProvider { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useThemeProvider(), { wrapper })
  
    expect(result.current).toBe(null)
  })
})
