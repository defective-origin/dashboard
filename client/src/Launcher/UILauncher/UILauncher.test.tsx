// ---| tests |---
import { RenderResult, renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { UILauncherOptions, useUILauncher } from './UILauncher.context'
import UILauncher, { UILauncherProps } from './UILauncher.component'

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
describe('[UILauncher] context', () => {
  let hookRef: RenderResult<UILauncherOptions>
  const wrapper = (props: UILauncherProps) => <UILauncher { ...props } />

  beforeEach(() => {
    hookRef = renderHook(useUILauncher, { wrapper }).result
  })

  it('should set light theme by default', () => {
    expect(hookRef.current.isTheme('light')).toBeTruthy()
  })

  it('should switch theme', () => {
    hookRef.current.toggleTheme()

    expect(hookRef.current.isTheme('dark')).toBeTruthy()
  })
})
