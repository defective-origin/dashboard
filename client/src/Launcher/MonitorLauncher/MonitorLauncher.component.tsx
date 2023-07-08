import React, { useMemo } from 'react'

// ---| self |---
import { MonitorLauncherContext, MonitorLauncherOptions } from './MonitorLauncher.context'

export type MonitorLauncherProps = React.PropsWithChildren

export function MonitorLauncher(props: MonitorLauncherProps): JSX.Element {
  const options = useMemo<MonitorLauncherOptions>(() => ({
    flag: (type) => !!new URLSearchParams(window.location.search).get(type),
    log: (type, options) => { console.log('LOG:', type, options) },
    event: (type, options) => { console.log('EVENT:', type, options) },
  }), [])

  return <MonitorLauncherContext.Provider value={options} {...props} />
}

MonitorLauncher.displayName = 'MonitorLauncher'

export default MonitorLauncher
