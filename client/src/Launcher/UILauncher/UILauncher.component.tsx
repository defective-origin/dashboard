import React, { useEffect, useMemo } from 'react'
import { StyledEngineProvider } from '@mui/material/styles'

// ---| common |---
import { useObject } from 'common/hooks'

// ---| components |---
import { toast } from 'components/lib/Toast'

// ---| self |---
import UI, { UIItemMap, UIProps } from './UI'
import {
  UILauncherContext,
  UILauncherActions,
  UILauncherOptions,
  DEFAULT_UI_LAUNCHER_STATE,
} from './UILauncher.context'
import './UILauncher.module.scss'

export function is<T>(a: T, b: T): a is T {
  return a === b
}

export function toggle<T>(current: T, a: T, b: T): T {
  return is(current, a) ? b : a
}

export type UILauncherProps = React.PropsWithChildren & {
  toaster?: UIProps['toaster']
}

/**
 * Setup all ui context providers.
 *
 * How to use
 * @example
 * <UILauncher defaultProp={1} />
 */
export function UILauncher(props: UILauncherProps): JSX.Element {
  const { toaster, children } = props
  const ui = useObject(DEFAULT_UI_LAUNCHER_STATE)
  const itemMap = useObject({ content: children } as UIItemMap)

  // actions are separated to prevent side effects
  // if we subscribe to change dependencies. Example: useHook(val, [dep1, dep2])
  const actions = useMemo<UILauncherActions>(() => ({
    change: ui.merge,

    isTheme: (value) => is(ui.current.theme, value),
    toggleTheme: () => ui.merge({ theme: toggle(ui.current.theme, 'light', 'dark') }),

    isMode: (value) => is(ui.current.mode, value),
    toggleMode: () => ui.merge({ mode: toggle(ui.current.mode, 'edit', 'view')}),

    isMenu: (value) => is(ui.current.menu, value),
    toggleMenu: () => ui.merge({ menu: toggle(ui.current.menu, 'opened', 'closed') }),

    attach: (options: Partial<UIItemMap>) => {
      itemMap.merge(options)

      return () => itemMap.omit(...Object.keys(options) as (keyof UIItemMap)[])
    },
    detach: (...args) => itemMap.omit(...args),

    message: (...args) => args.forEach((item) => toast(item.content, item)),
  }), [ui, itemMap])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo<UILauncherOptions>(() => ({ ...ui.current, ...actions }), [ui.current, actions])

  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <UILauncherContext.Provider value={options}>
        {/* injectFirst allows override Material UI's styles. */}
        <StyledEngineProvider injectFirst>
          <UI toaster={toaster} map={itemMap.current}>
            { children }
          </UI>
        </StyledEngineProvider>
      </UILauncherContext.Provider>
    </React.Suspense>
  )
}

UILauncher.displayName = 'UILauncher'

export default UILauncher
