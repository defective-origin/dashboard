import React, { useContext } from 'react'

// ---| self |---
import { UseAccountReturnOptions } from './UseAccount'
import { UseMonitorReturnOptions } from './UseMonitor'
import { UseSystemReturnOptions } from './UseSystem'
import { UseUIReturnOptions } from './UseUI'

export type LauncherOptions = UseSystemReturnOptions
                            & UseMonitorReturnOptions
                            & UseUIReturnOptions
                            & UseAccountReturnOptions

export const DEFAULT_LAUNCHER_OPTIONS = {} as LauncherOptions

export const LauncherContext = React.createContext(DEFAULT_LAUNCHER_OPTIONS)
LauncherContext.displayName = 'LauncherContext'

export function useLauncher(): LauncherOptions {
  return useContext(LauncherContext)
}

export default useLauncher
