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
  languages: ['en', 'ru'],
  hotkeys: {},
}

export type SystemLauncherOptions = SystemLauncherState & {
  t: typeof t
  changeLanguage: (patch: SystemLanguage) => void
  addHotkey: (key: string, handler: () => void) => void
  removeHotkey: (key: string) => void
}

export const DEFAULT_SYSTEM_LAUNCHER_OPTIONS: SystemLauncherOptions = {
  ...DEFAULT_SYSTEM_LAUNCHER_STATE,
  t: () => '',
  changeLanguage: () => {},
  addHotkey: () => {},
  removeHotkey: () => {},
}

export const SystemLauncherContext = React.createContext(DEFAULT_SYSTEM_LAUNCHER_OPTIONS)
SystemLauncherContext.displayName = 'SystemLauncherContext'

export function useSystemLauncher(): SystemLauncherOptions {
  return useContext(SystemLauncherContext)
}

export default useSystemLauncher
