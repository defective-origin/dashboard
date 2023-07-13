import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StyledEngineProvider } from '@mui/material/styles'

// ---| self |---
import './UILauncher.module.scss'
import UILayout, { UIItemMap, UIPlace, UILayoutProps } from './UILayout'
import {
  UILauncherState,
  UILauncherContext,
  UILauncherOptions,
  DEFAULT_UI_LAUNCHER_STATE,
} from './UILauncher.context'

export type UILauncherProps = React.PropsWithChildren & {
  toastConfig: UILayoutProps['toastConfig']
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
  const [current, setCurrent] = useState(DEFAULT_UI_LAUNCHER_STATE)
  const oppositeTheme = current.theme === 'light' ? 'dark' : 'light'
  // todo: переписать на UseList
  const [layoutMap, setLayoutMap] = useState({} as UIItemMap)

  const update = useCallback((patch: Partial<UILauncherState>) => {
    // TODO: analytic.register and api.update for each handler
    setCurrent((state) => ({ ...state, ...patch }))
  }, [])

  const options = useMemo<UILauncherOptions>(() => ({
    ...current,
    change: (patch) => { setCurrent((state) => ({ ...state, ...patch})) },

    isTheme: (value) => current.theme === value,
    toggleTheme: () => update({ theme: oppositeTheme }),

    isMode: (value) => current.mode === value,
    toggleMode: () => update({ mode: current.mode === 'view' ? 'edit' : 'view' }),

    isMenu: (value) => current.menu === value,
    toggleMenu: () => update({ menu: current.menu === 'opened' ? 'closed' : 'opened' }),

    show: (items) => setLayoutMap((state) => ({ ...state, ...items })),
    hide: (...items) => {
      setLayoutMap((state) => {
        const copy = {...state}

        items.forEach((item) => {
          delete copy[item as UIPlace]
        })

        return copy
      })
    },
  }), [current, oppositeTheme, update])

  useEffect(() => {
    document.body.classList.add(current.theme)
    document.body.classList.remove(oppositeTheme)
  }, [current, oppositeTheme])

  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <UILauncherContext.Provider value={options}>
        {/* injectFirst allows override Material UI's styles. */}
        <StyledEngineProvider injectFirst>
          <UILayout toastConfig={toastConfig} map={layoutMap}>
            { children }
          </UILayout>
        </StyledEngineProvider>
      </UILauncherContext.Provider>
    </React.Suspense>
  )
}

UILauncher.displayName = 'UILauncher'

export default UILauncher
