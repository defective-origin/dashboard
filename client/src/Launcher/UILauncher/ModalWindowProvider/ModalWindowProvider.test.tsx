// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useModalWindowProvider } from './ModalWindowProvider.context'
import ModalWindowProvider, { ModalWindowProviderProps } from './ModalWindowProvider.component'

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
describe('[ModalWindowProvider] context', () => {
  const wrapper = (props: ModalWindowProviderProps) => <ModalWindowProvider { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useModalWindowProvider(), { wrapper })
  
    expect(result.current).toBe(null)
  })
})
