import React, { useContext } from 'react'
import { UIItemMap, UIPlace } from './UILayout'

export type UITheme = 'light' | 'dark'
export type UIMode = 'view' | 'edit'
export type UIMenu = 'opened' | 'closed'

export type UILauncherState = {
  theme: UITheme
  mode: UIMode
  menu: UIMenu
}

export const DEFAULT_UI_LAUNCHER_STATE: UILauncherState = {
  theme: 'light',
  mode: 'view',
  menu: 'closed',
}

export type UILauncherActions = {
  change: (patch: Partial<UILauncherState>) => void,

  isTheme: (theme: UITheme) => boolean,
  toggleTheme: () => void,

  isMode: (mode: UIMode) => boolean,
  toggleMode: () => void,

  isMenu: (mode: UIMenu) => boolean,
  toggleMenu: () => void,

  show: (options: Partial<UIItemMap>) => void
  hide: (...args: UIPlace[]) => void
}

export const DEFAULT_UI_LAUNCHER_ACTIONS: UILauncherActions = {
  change: () => {},

  isTheme: () => true,
  toggleTheme: () => {},

  isMode: () => true,
  toggleMode: () => {},

  isMenu: () => true,
  toggleMenu: () => {},

  show: () => {},
  hide: () => {},
}

export type UILauncherOptions = UILauncherState & UILauncherActions

export const DEFAULT_UI_LAUNCHER_OPTIONS: UILauncherOptions = {
  ...DEFAULT_UI_LAUNCHER_STATE,
  ...DEFAULT_UI_LAUNCHER_ACTIONS,
}

export const UILauncherContext = React.createContext(DEFAULT_UI_LAUNCHER_OPTIONS)
UILauncherContext.displayName = 'UILauncherContext'

export function useUILauncher(): UILauncherOptions {
  return useContext(UILauncherContext)
}

export default useUILauncher
