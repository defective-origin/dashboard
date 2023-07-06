// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useLocaleProvider } from './LocaleProvider.context'
import LocaleProvider, { LocaleProviderProps } from './LocaleProvider.component'

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
describe('[LocaleProvider] context', () => {
  const wrapper = (props: LocaleProviderProps) => <LocaleProvider { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useLocaleProvider(), { wrapper })
  
    expect(result.current.current).toBe('en-US')
  })
})
