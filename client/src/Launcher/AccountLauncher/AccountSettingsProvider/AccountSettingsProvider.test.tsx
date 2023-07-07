// ---| tests |---
import { RenderResult, renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { AccountSettingsProviderOptions, useAccountSettingsProvider } from './AccountSettingsProvider.context'
import AccountSettingsProvider, { AccountSettingsProviderProps } from './AccountSettingsProvider.component'

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
describe('[AccountSettingsProvider] context', () => {
  let hookRef: RenderResult<AccountSettingsProviderOptions>
  const wrapper = (props: AccountSettingsProviderProps) => <AccountSettingsProvider { ...props } />

  beforeEach(() => {
    hookRef = renderHook(useAccountSettingsProvider, { wrapper }).result
  })

  it('should return options', () => {
    expect(hookRef.current.current).toBe(null)
  })
})
