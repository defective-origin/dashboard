// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useAnalyticsProvider } from './AnalyticsProvider.context'
import AnalyticsProvider, { AnalyticsProviderProps } from './AnalyticsProvider.component'

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
describe('[AnalyticsProvider] context', () => {
  const wrapper = (props: AnalyticsProviderProps) => <AnalyticsProvider { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useAnalyticsProvider(), { wrapper })
  
    expect(result.current.current).toBe(null)
  })
})
