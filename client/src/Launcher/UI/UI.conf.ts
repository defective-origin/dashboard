import { LayoutProps } from 'components/Layout'
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

export type MenuActions = {
  isTheme: (theme: UITheme) => boolean,
  toggleTheme: () => void,

  isMode: (mode: UIMode) => boolean,
  toggleMode: () => void,

  isMenu: (mode: UIMenu) => boolean,
  toggleMenu: () => void,
}


// const MENU_ACTIONS = {
//   isTheme: (value) => is(ui.current.theme, value),
//   toggleTheme: () => ui.merge({ theme: toggle(ui.current.theme, 'light', 'dark') }),

//   isMode: (value) => is(ui.current.mode, value),
//   toggleMode: () => ui.merge({ mode: toggle(ui.current.mode, 'edit', 'view')}),

//   isMenu: (value) => is(ui.current.menu, value),
//   toggleMenu: () => ui.merge({ menu: toggle(ui.current.menu, 'opened', 'closed') }),
// }

export type CustomPlace = 'menu' | 'leftAside' | 'rightAside' | 'content' | 'header' | 'footer' | 'guard' | 'drawer' | 'modal' | 'alert'
export type UIItem<P extends string, V> = Record<P, V>
export type UIItemMap = UIItem<CustomPlace, React.ReactNode>

export type UIPlace = keyof UIItemMap

export type UILayout = LayoutProps

export const DEFAULT_UI_LAYOUT: UILayout = {
  areas: `
    'menu alert alert alert alert'
    'menu header header header drawer'
    'menu left-aside content right-aside drawer'
    'menu left-aside guard right-aside drawer'
    'menu footer footer footer drawer'
  `,
  columns: 'auto auto 1fr auto auto',
  rows: 'auto auto 1fr auto auto',
}

export type UIActions = {
  attach: (options: Partial<UIItemMap>) => void
  detach: (...args: UIPlace[]) => void
  message: (...args: ToastOptions[]) => void
}

export const DEFAULT_UI_ACTIONS: UIActions = {
  attach: () => {},
  detach: () => {},
  message: () => {},
}
