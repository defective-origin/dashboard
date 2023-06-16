import React, { useContext } from 'react'

// ---| self |---
import { UIThemeTypes } from './UI.constant'

export type UIContextConf = {
  theme: UIThemeTypes
  setTheme?: (theme: UIThemeTypes) => void,
}

export const DEFAULT_UI_CONF: UIContextConf = {
  theme: 'light',
}

export const UIContext = React.createContext<UIContextConf>(DEFAULT_UI_CONF)

// FIXME: usecontext (setTheme) in each ThemeUI hook
// FIXME: add style confs for box, text, scroll ...
export function useUIContext<T extends UIContextConf>(): T {
  return useContext(UIContext) as T
}
