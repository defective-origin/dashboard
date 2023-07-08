import React, { useEffect, useMemo, useState } from 'react'
import { StyledEngineProvider } from '@mui/material/styles'

// ---| self |---
import './UILauncher.module.scss'
import {
  UILauncherContext,
  UILauncherOptions,
  DEFAULT_UI_LAUNCHER_STATE,
} from './UILauncher.context'

export type UILauncherProps = React.PropsWithChildren

/**
 * Setup all ui context providers.
 *
 * How to use
 * @example
 * <UILauncher defaultProp={1} />
 */
export function UILauncher(props: UILauncherProps): JSX.Element {
  const { children } = props
  const [current, setCurrent] = useState(DEFAULT_UI_LAUNCHER_STATE)
  const oppositeTheme = current.theme === 'light' ? 'dark' : 'light'

  const options = useMemo<UILauncherOptions>(() => ({
    ...current,
    isTheme: (value) => current.theme === value,
    isMode: (value) => current.mode === value,
    change: (patch) => { setCurrent((state) => ({ ...state, ...patch})) },
    toggleTheme: () => {
      // TODO: analytic.register({ name: 'UITheme', value: oppositeTheme })
      // TODO: api.update({ name: 'UITheme', value: oppositeTheme })
      setCurrent((state) => ({ ...state, theme: oppositeTheme }))
    },
    toggleMode: () => {
      // TODO: analytic.register({ name: 'UIMode', value: state.mode === 'view' ? 'edit' : 'view' })
      // TODO: api.update({ name: 'UIMode', value: state.mode === 'view' ? 'edit' : 'view' })
      setCurrent((state) => ({ ...state, mode: state.mode === 'view' ? 'edit' : 'view' }))
    },
  }), [current, oppositeTheme])

  useEffect(() => {
    document.body.classList.add(current.theme)
    document.body.classList.remove(oppositeTheme)
  }, [current, oppositeTheme])

  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <UILauncherContext.Provider value={options}>
        {/* injectFirst allows override Material UI's styles. */}
        <StyledEngineProvider injectFirst>
          { children }
        </StyledEngineProvider>
      </UILauncherContext.Provider>
    </React.Suspense>
  )
}

UILauncher.displayName = 'UILauncher'

export default UILauncher
