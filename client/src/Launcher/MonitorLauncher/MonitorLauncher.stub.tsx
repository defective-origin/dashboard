import React from 'react'
import {
  DEFAULT_MONITOR_LAUNCHER_OPTIONS,
  MonitorLauncherContext,
  MonitorLauncherOptions,
} from './MonitorLauncher.context'

export type MonitorLauncherStubProps = React.PropsWithChildren & Partial<MonitorLauncherOptions>

export function MonitorLauncherStub(props: MonitorLauncherStubProps): JSX.Element {
  const { children, ...otherProps } = props
  const combinedValue = { ...DEFAULT_MONITOR_LAUNCHER_OPTIONS, ...otherProps }

  return <MonitorLauncherContext.Provider value={combinedValue} children={children} />
}

export default MonitorLauncherStub
