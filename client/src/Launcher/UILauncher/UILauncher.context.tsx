import React, { useContext } from 'react'

export type UITheme = 'light' | 'dark'
export type UIMode = 'view' | 'edit'

export type UIStatus = 'warning' | 'error' | 'info' | 'success'
export type UITypedItem<T = UIStatus, P extends object = object> = { type?: T } & P
export type UIBlockItem = {
  content?: React.ReactNode
  actions?: UITypedItem[]
}
export type UICardItem = {
  closable?: boolean
  title?: React.ReactNode
  content?: React.ReactNode
  actions?: UITypedItem[]
}

export type UILauncherState = {
  theme: UITheme
  mode: UIMode
  menu?: UIBlockItem
  alert?: UITypedItem[]
  drawer?: UICardItem
  guard?: UIBlockItem
  leftAside?: UICardItem
  header?: UIBlockItem
  rightAside?: UICardItem
  snackbar?: UITypedItem[]
  modal?: UICardItem
}

export const DEFAULT_UI_LAUNCHER_STATE: UILauncherState = {
  theme: 'light',
  mode: 'view',
}

export type UILauncherOptions = UILauncherState & {
  isTheme: (theme: UITheme) => boolean,
  isMode: (mode: UIMode) => boolean,
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
