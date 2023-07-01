// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useABTestProvider } from './ABTestProvider.context'
import ABTestProvider, { ABTestProviderProps } from './ABTestProvider.component'

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
describe('[ABTestProvider] context', () => {
  const wrapper = (props: ABTestProviderProps) => <ABTestProvider { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useABTestProvider(), { wrapper })
  
    expect(result.current).toBe(null)
  })
})
