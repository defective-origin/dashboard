// ---| tests |---
import { RenderResult, renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { UISettingsProviderOptions, useUISettingsProvider } from './UISettingsProvider.context'
import UISettingsProvider, { UISettingsProviderProps } from './UISettingsProvider.component'

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
describe('[UISettingsProvider] context', () => {
  let hookRef: RenderResult<UISettingsProviderOptions>
  const wrapper = (props: UISettingsProviderProps) => <UISettingsProvider { ...props } />

  beforeEach(() => {
    hookRef = renderHook(useUISettingsProvider, { wrapper }).result
  })

  it('should set light theme by default', () => {
    expect(hookRef.current.isTheme('light')).toBeTruthy()
  })

  it('should switch theme', () => {
    hookRef.current.toggleTheme()

    expect(hookRef.current.isTheme('dark')).toBeTruthy()
  })
})
