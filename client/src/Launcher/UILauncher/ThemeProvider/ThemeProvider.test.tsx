// ---| tests |---
import { RenderResult, renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { ThemeProviderOptions, useThemeProvider } from './ThemeProvider.context'
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
  let hookRef: RenderResult<ThemeProviderOptions>
  const wrapper = (props: ThemeProviderProps) => <ThemeProvider { ...props } />

  beforeEach(() => {
    hookRef = renderHook(useThemeProvider, { wrapper }).result
  })

  it('should set light theme by default', () => {
    expect(hookRef.current.is('light')).toBeTruthy()
  })

  it('should switch theme', () => {
    hookRef.current.toggle()

    expect(hookRef.current.is('dark')).toBeTruthy()
  })
})
