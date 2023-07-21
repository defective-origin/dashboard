import React, { useContext } from 'react'
import { UIActions } from './UI'

export type LauncherRegisterAction = (state: LauncherState, ...args: any[]) => any
export type LauncherAction = (...args: any[]) => any
export type LauncherRegisterActionMap = Record<string, LauncherRegisterAction>

export type LauncherState = Record<string, any>

export const DEFAULT_LAUNCHER_STATE: LauncherState = {}

export type LauncherActions = UIActions & {
  update: (...args: Partial<LauncherState>[]) => void
  register: (actions: LauncherRegisterActionMap) => void
  unregister: (actions: LauncherRegisterActionMap) => void
  [key: string]: LauncherAction
}

export const DEFAULT_LAUNCHER_ACTIONS: LauncherActions = {
  update: () => {},
  register: () => {},
  unregister: () => {},
  attach: () => {},
  detach: () => {},
  message: () => {},
  t: () => {},
}

export type LauncherOptions = LauncherState & LauncherActions

export const DEFAULT_LAUNCHER_OPTIONS: LauncherOptions = {
  ...DEFAULT_LAUNCHER_STATE,
  ...DEFAULT_LAUNCHER_ACTIONS,
}

export const LauncherContext = React.createContext(DEFAULT_LAUNCHER_OPTIONS)
LauncherContext.displayName = 'LauncherContext'

export function useLauncher(): LauncherOptions {
  return useContext(LauncherContext)
}

export default useLauncher
