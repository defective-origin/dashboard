// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useSettingsProvider } from './SettingsProvider.context'
import SettingsProvider, { SettingsProviderProps } from './SettingsProvider.component'

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
describe('[SettingsProvider] context', () => {
  const wrapper = (props: SettingsProviderProps) => <SettingsProvider { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useSettingsProvider(), { wrapper })
  
    expect(result.current).toBe(null)
  })
})
