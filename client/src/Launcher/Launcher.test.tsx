// ---| tests |---
import { RenderResult, renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { LauncherOptions, useLauncher } from './Launcher.context'
import Launcher, { LauncherProps } from './Launcher.component'

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
describe('[Launcher] context', () => {
  let hookRef: RenderResult<LauncherOptions>
  const wrapper = (props: LauncherProps) => <Launcher { ...props } />

  beforeEach(() => {
    hookRef = renderHook(useLauncher, { wrapper }).result
  })

  it('should set light theme by default', () => {
    expect(hookRef.current.isTheme('light')).toBeTruthy()
  })

  it('should switch theme', () => {
    hookRef.current.toggleTheme()

    expect(hookRef.current.isTheme('dark')).toBeTruthy()
  })
})
