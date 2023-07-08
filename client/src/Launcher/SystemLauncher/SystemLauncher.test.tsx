// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useSystemLauncher } from './SystemLauncher.context'
import SystemLauncher, { SystemLauncherProps } from './SystemLauncher.component'

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
describe('[SystemLauncher] context', () => {
  const wrapper = (props: SystemLauncherProps) => <SystemLauncher { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useSystemLauncher(), { wrapper })

    expect(result.current).toBeTruthy()
  })
})
