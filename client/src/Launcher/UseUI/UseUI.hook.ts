import { useMemo } from 'react'

// ---| common |---
import { useObject } from 'common/hooks'

// ---| components |---
import { ToastOptions, toast } from 'components/lib/Toast'

export function is<T>(a: T, b: T): a is T {
  return a === b
}

export function toggle<T>(current: T, a: T, b: T): T {
  return is(current, a) ? b : a
}

export type UITheme = 'light' | 'dark'
export type UIMode = 'view' | 'edit'
export type UIMenu = 'opened' | 'closed'

export type UIState = {
  theme: UITheme
  mode: UIMode
  menu: UIMenu
  pageName: React.ReactNode
}

export const DEFAULT_UI_STATE: UIState = {
  theme: 'light',
  mode: 'view',
  menu: 'closed',
  pageName: '',
}

export type UIActions = {
  change: (patch: Partial<UIState>) => void,

  toggleTheme: () => void,
  toggleMode: () => void,
  toggleMenu: () => void,

  // attach: (options: Partial<UIItemMap>) => () => void,
  // detach: (...args: UIPlace[]) => void,
  message: (...args: ToastOptions[]) => void,

  setPageName: (name?: React.ReactNode) => void,
}

export type UISelectors = {
  isTheme: (theme: UITheme) => boolean,
  isMode: (mode: UIMode) => boolean,
}

export type UseUIReturnOptions = UIState & UIActions & UISelectors

/**
 * Hook descriptions
 *
 * @example
 * const options = useUI(conf)
 */
export const useUI = (): UseUIReturnOptions | null => {
  const state = useObject(DEFAULT_UI_STATE)

  const actions = useMemo<UIActions>(() => ({
    change: state.merge,

    toggleTheme: () => state.merge({ theme: toggle(state.current.theme, 'light', 'dark') }),
    toggleMode: () => state.merge({ mode: toggle(state.current.mode, 'edit', 'view')}),
    toggleMenu: () => state.merge({ menu: toggle(state.current.menu, 'opened', 'closed') }),

    message: (...args) => args.forEach((item) => toast(item.content, item)),

    setPageName: (pageName) => state.merge({ pageName }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  const selectors = useMemo<UISelectors>(() => ({
    isTheme: (value) => is(state.current.theme, value),
    isMode: (value) => is(state.current.mode, value),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo<UseUIReturnOptions>(() => ({ ...state.current, ...actions, ...selectors }), [state.current])
}

export default useUI
