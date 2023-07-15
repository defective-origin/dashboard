import React, { useMemo } from 'react'

// ---| common |---
import { useObject } from 'common/hooks'

// ---| self |---
import {
  MonitorLauncherContext,
  MonitorLauncherActions,
  MonitorLauncherOptions,
  DEFAULT_MONITOR_LAUNCHER_STATE,
} from './MonitorLauncher.context'

export type MonitorLauncherProps = React.PropsWithChildren

export function MonitorLauncher(props: MonitorLauncherProps): JSX.Element {
  const monitor = useObject(DEFAULT_MONITOR_LAUNCHER_STATE)

  // actions are separated to prevent side effects
  // if we subscribe to change dependencies. Example: useHook(val, [dep1, dep2])
  const actions = useMemo<MonitorLauncherActions>(() => ({
    flag: (type) => !!new URLSearchParams(window.location.search).get(type),
    log: (type, options) => { console.log('LOG:', type, options) },
    event: (type, options) => { console.log('EVENT:', type, options) },
  }), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo<MonitorLauncherOptions>(() => Object.assign(actions, monitor.current), [monitor.current, actions])

  return <MonitorLauncherContext.Provider value={options} {...props} />
}

MonitorLauncher.displayName = 'MonitorLauncher'

export default MonitorLauncher
