import React, { useContext } from 'react'
import { UIItemMap, UIPlace } from './UI'
import { ToastOptions } from 'components/lib/Toast'

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

  attach: (options: Partial<UIItemMap>) => void,
  detach: (...args: UIPlace[]) => void,
  message: (...args: ToastOptions[]) => void,
}

export const DEFAULT_UI_LAUNCHER_ACTIONS: UILauncherActions = {
  change: () => {},

  isTheme: () => true,
  toggleTheme: () => {},

  isMode: () => true,
  toggleMode: () => {},

  isMenu: () => true,
  toggleMenu: () => {},

  attach: () => {},
  detach: () => {},
  message: () => {},
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
