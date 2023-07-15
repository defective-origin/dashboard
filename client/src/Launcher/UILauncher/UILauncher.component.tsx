import React, { useEffect, useMemo } from 'react'
import { StyledEngineProvider } from '@mui/material/styles'

// ---| common |---
import { useObject } from 'common/hooks'

// ---| self |---
import UILayout, { UIItemMap, UILayoutProps } from './UILayout'
import {
  UILauncherContext,
  UILauncherActions,
  UILauncherOptions,
  DEFAULT_UI_LAUNCHER_STATE,
} from './UILauncher.context'
import './UILauncher.module.scss'

export function toggle<T>(current: T, a: T, b: T): T {
  return current === a ? b : a
}

export type UILauncherProps = React.PropsWithChildren & {
  toastConfig?: UILayoutProps['toastConfig']
}

/**
 * Setup all ui context providers.
 *
 * How to use
 * @example
 * <UILauncher defaultProp={1} />
 */
export function UILauncher(props: UILauncherProps): JSX.Element {
  const { toastConfig, children } = props
  const ui = useObject(DEFAULT_UI_LAUNCHER_STATE)
  const layout = useObject<Partial<UIItemMap>>({})

  // actions are separated to prevent side effects
  // if we subscribe to change dependencies. Example: useHook(val, [dep1, dep2])
  const actions = useMemo<UILauncherActions>(() => ({
    change: ui.merge,

    isTheme: (value) => ui.current.theme === value,
    toggleTheme: () => ui.merge({ theme: toggle(ui.current.theme, 'light', 'dark') }),

    isMode: (value) => ui.current.mode === value,
    toggleMode: () => ui.merge({ mode: toggle(ui.current.mode, 'edit', 'view')}),

    isMenu: (value) => ui.current.menu === value,
    toggleMenu: () => ui.merge({ menu: toggle(ui.current.menu, 'opened', 'closed') }),

    show: layout.merge,
    hide: layout.omit,
  }), [ui, layout])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo<UILauncherOptions>(() => ({ ...ui.current, ...actions }), [ui.current, actions])

  useEffect(() => {
    document.body.classList.add(ui.current.theme)
    document.body.classList.remove(toggle(ui.current.theme, 'light', 'dark'))
  }, [ui, ui.current.theme])

  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <UILauncherContext.Provider value={options}>
        {/* injectFirst allows override Material UI's styles. */}
        <StyledEngineProvider injectFirst>
          <UILayout toastConfig={toastConfig} map={layout.current}>
            { children }
          </UILayout>
        </StyledEngineProvider>
      </UILauncherContext.Provider>
    </React.Suspense>
  )
}

UILauncher.displayName = 'UILauncher'

export default UILauncher
