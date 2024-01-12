import React, { useMemo } from 'react'
import { StyledEngineProvider, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material'

// ---| core |---
import i18next, { LocaleProvider, useLocale } from 'locale'
import { RouterProvider, APP_ROUTES } from 'router'

// ---| self |---
import { LauncherContext, LauncherOptions } from './Launcher.context'
import useSystem from './UseSystem'
import useAccount from './UseAccount'
import useMonitor from './UseMonitor'
import useUI from './UseUI'

export type LauncherProps = Partial<React.PropsWithChildren & LauncherOptions>

/**
 * Run all launchers with main app page.
 *
 * How to use
 * @example
 * <Launcher />
 */
export function Launcher(props: LauncherProps): JSX.Element {
  const { children, ...defaultOptions } = props
  const ui = useUI()
  const system = useSystem()
  const monitor = useMonitor()
  const account = useAccount()
  const locale = useLocale()

  const options = useMemo(
    () => Object.assign({}, system, monitor, ui, account, locale, defaultOptions),
    [system, monitor, ui, account, locale, defaultOptions],
  )

  return (
    <React.StrictMode>
      <LocaleProvider i18n={i18next}>
        <React.Suspense fallback={<h1>Loading...</h1>}>
          {/* https://bareynol.github.io/mui-theme-creator/ */}
          {/* injectFirst allows override Material UI's styles. */}
          <StyledEngineProvider injectFirst>
            <CssVarsProvider>
              <LauncherContext.Provider value={options}>
                <RouterProvider router={APP_ROUTES} />
                { children }
              </LauncherContext.Provider>
            </CssVarsProvider>
          </StyledEngineProvider>
        </React.Suspense>
      </LocaleProvider>
    </React.StrictMode>
  )
}

Launcher.displayName = 'Launcher'

export default Launcher
