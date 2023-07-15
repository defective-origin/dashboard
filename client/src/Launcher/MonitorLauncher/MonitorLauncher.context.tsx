import React, { useContext } from 'react'

export type MonitorLauncherState = Record<string, unknown>

export const DEFAULT_MONITOR_LAUNCHER_STATE: MonitorLauncherState = {}

export type MonitorLauncherActions = {
  flag: (type: string) => boolean
  log: (type: 'info' | 'warn' | 'error', options: Record<string, unknown>) => void
  event: (type: string, options: Record<string, unknown>) => void
}

export const DEFAULT_MONITOR_LAUNCHER_ACTIONS: MonitorLauncherActions = {
  flag: () => false,
  log: () => {},
  event: () => {},
}

export type MonitorLauncherOptions = MonitorLauncherState & MonitorLauncherActions

export const DEFAULT_MONITOR_LAUNCHER_OPTIONS: MonitorLauncherOptions = {
  ...DEFAULT_MONITOR_LAUNCHER_STATE,
  ...DEFAULT_MONITOR_LAUNCHER_ACTIONS,
}

export const MonitorLauncherContext = React.createContext(DEFAULT_MONITOR_LAUNCHER_OPTIONS)
MonitorLauncherContext.displayName = 'MonitorLauncherContext'

export function useMonitorLauncher(): MonitorLauncherOptions {
  return useContext(MonitorLauncherContext)
}

export default useMonitorLauncher
