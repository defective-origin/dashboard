import React, { useContext } from 'react'
import { Languages, t } from 'locale'

export type SystemLanguage = Languages

export type SystemLauncherState = {
  language: SystemLanguage
  languages: SystemLanguage[]
  hotkeys: Record<string, () => void>
}

export const DEFAULT_SYSTEM_LAUNCHER_STATE: SystemLauncherState = {
  language: 'en',
  languages: ['en'],
  hotkeys: {},
}

export type SystemLauncherActions = {
  t: typeof t
  changeLanguage: (patch: SystemLanguage) => void
  addHotkey: (key: string, handler: () => void) => void
  removeHotkey: (key: string) => void
}

export const DEFAULT_SYSTEM_LAUNCHER_ACTIONS: SystemLauncherActions = {
  t: () => '',
  changeLanguage: () => {},
  addHotkey: () => {},
  removeHotkey: () => {},
}

export type SystemLauncherOptions = SystemLauncherState & SystemLauncherActions

export const DEFAULT_SYSTEM_LAUNCHER_OPTIONS: SystemLauncherOptions = {
  ...DEFAULT_SYSTEM_LAUNCHER_STATE,
  ...DEFAULT_SYSTEM_LAUNCHER_ACTIONS,
}

export const SystemLauncherContext = React.createContext(DEFAULT_SYSTEM_LAUNCHER_OPTIONS)
SystemLauncherContext.displayName = 'SystemLauncherContext'

export function useSystemLauncher(): SystemLauncherOptions {
  return useContext(SystemLauncherContext)
}

export default useSystemLauncher
