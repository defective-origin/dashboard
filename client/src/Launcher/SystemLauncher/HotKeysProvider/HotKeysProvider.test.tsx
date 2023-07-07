// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useHotKeysProvider } from './HotKeysProvider.context'
import HotKeysProvider, { HotKeysProviderProps } from './HotKeysProvider.component'

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
describe('[HotKeysProvider] context', () => {
  const wrapper = (props: HotKeysProviderProps) => <HotKeysProvider { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useHotKeysProvider(), { wrapper })
  
    expect(result.current.current).toBe(null)
  })
})
