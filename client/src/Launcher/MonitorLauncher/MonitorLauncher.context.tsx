import React, { useContext } from 'react'

export type MonitorLauncherOptions = {
  flag: (type: string) => boolean
  log: (type: 'info' | 'warn' | 'error', options: Record<string, unknown>) => void
  event: (type: string, options: Record<string, unknown>) => void
}

export const DEFAULT_MONITOR_LAUNCHER_OPTIONS: MonitorLauncherOptions = {
  flag: () => false,
  log: () => {},
  event: () => {},
}

export const MonitorLauncherContext = React.createContext(DEFAULT_MONITOR_LAUNCHER_OPTIONS)
MonitorLauncherContext.displayName = 'MonitorLauncherContext'

export function useMonitorLauncher(): MonitorLauncherOptions {
  return useContext(MonitorLauncherContext)
}

export default useMonitorLauncher
