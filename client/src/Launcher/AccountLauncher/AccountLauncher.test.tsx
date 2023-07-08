// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useAccountLauncher } from './AccountLauncher.context'
import AccountLauncher, { AccountLauncherProps } from './AccountLauncher.component'

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
describe('[AccountLauncher] context', () => {
  const wrapper = (props: AccountLauncherProps) => <AccountLauncher { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useAccountLauncher(), { wrapper })

    expect(result.current).toBeTruthy()
  })
})
