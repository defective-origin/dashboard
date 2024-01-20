import React, { useMemo } from 'react'

// ---| core |---
import RouterProvider from 'router'
import LocaleProvider from 'locale'

// ---| self |---
import { LauncherContext, LauncherOptions } from './Launcher.context'
import useSystem from './UseSystem'
import useAccount from './UseAccount'
import useMonitor from './UseMonitor'
import useUI, { ThemeProvider } from './UseUI'

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

  const options = useMemo(
    () => Object.assign({}, system, monitor, ui, account, defaultOptions),
    [system, monitor, ui, account, defaultOptions],
  )

  return (
    <React.StrictMode>
      <LocaleProvider>
        <ThemeProvider>
          <React.Suspense fallback={<h1>Loading...</h1>}>
            <LauncherContext.Provider value={options}>
              <RouterProvider>
                { children }
              </RouterProvider>
            </LauncherContext.Provider>
          </React.Suspense>
        </ThemeProvider>
      </LocaleProvider>
    </React.StrictMode>
  )
}

Launcher.displayName = 'Launcher'

export default Launcher
