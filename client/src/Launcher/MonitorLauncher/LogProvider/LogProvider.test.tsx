// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useLogProvider } from './LogProvider.context'
import LogProvider, { LogProviderProps } from './LogProvider.component'

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
describe('[LogProvider] context', () => {
  const wrapper = (props: LogProviderProps) => <LogProvider { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useLogProvider(), { wrapper })
  
    expect(result.current.current).toBe(null)
  })
})
