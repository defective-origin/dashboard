// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useLauncher } from './Launcher.context'
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
  const wrapper = (props: LauncherProps) => <Launcher { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useLauncher(), { wrapper })

    expect(result.current).toBeTruthy()
  })
})
