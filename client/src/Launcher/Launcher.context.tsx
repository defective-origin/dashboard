import React, { useContext } from 'react'

// ---| self |---
import { AccountReturnOptions } from './UseAccount'
import { MonitorReturnOptions } from './UseMonitor'
import { SystemReturnOptions } from './UseSystem'
import { UIReturnOptions } from './UseUI'


// TODO: (kseniya_boldak) think about refactoring

export type LauncherOptions = SystemReturnOptions
                            & MonitorReturnOptions
                            & UIReturnOptions
                            & AccountReturnOptions

export const DEFAULT_LAUNCHER_OPTIONS = {} as LauncherOptions

export const LauncherContext = React.createContext(DEFAULT_LAUNCHER_OPTIONS)
LauncherContext.displayName = 'LauncherContext'

export function useLauncher(): LauncherOptions {
  return useContext(LauncherContext)
}

export default useLauncher
