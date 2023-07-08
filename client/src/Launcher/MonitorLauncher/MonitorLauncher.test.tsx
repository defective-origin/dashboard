// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import { useMonitorLauncher } from './MonitorLauncher.context'
import MonitorLauncher, { MonitorLauncherProps } from './MonitorLauncher.component'

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
describe('[MonitorLauncher] context', () => {
  const wrapper = (props: MonitorLauncherProps) => <MonitorLauncher { ...props } />

  it('should return options', () => {
    const { result } = renderHook(() => useMonitorLauncher(), { wrapper })

    expect(result.current).toBeTruthy()
  })
})
