import React, { useContext } from 'react'

export type UIThemeType = 'light' | 'dark'
export type UIModeType = 'view' | 'edit'

export type UILauncherState = {
  theme: UIThemeType
  mode: UIModeType
}

export const DEFAULT_UI_LAUNCHER_STATE: UILauncherState = {
  theme: 'light',
  mode: 'view',
}

export type UILauncherOptions = UILauncherState & {
  isTheme: (theme: UIThemeType) => boolean,
  isMode: (mode: UIModeType) => boolean,
  change: (patch: Partial<UILauncherState>) => void,
  toggleTheme: () => void,
  toggleMode: () => void,
}

export const DEFAULT_UI_LAUNCHER_OPTIONS: UILauncherOptions = {
  ...DEFAULT_UI_LAUNCHER_STATE,
  isTheme: () => true,
  isMode: () => true,
  change: () => {},
  toggleTheme: () => {},
  toggleMode: () => {},
}

export const UILauncherContext = React.createContext(DEFAULT_UI_LAUNCHER_OPTIONS)
UILauncherContext.displayName = 'UILauncherContext'

export function useUILauncher(): UILauncherOptions {
  return useContext(UILauncherContext)
}

export default useUILauncher
