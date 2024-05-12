import React from 'react'

// ---| core |---
import RouterProvider from 'router/router.context'
import LocaleProvider from 'locale/locale.context'
import ThemeProvider from 'theme/theme.context'
import { useAccount } from 'api'

// ---| self |---
import { AppProvider } from './App.context'

export type LauncherProps = React.PropsWithChildren

/**
 * Run all providers.
 *
 * How to use
 * @example
 * <Launcher />
 */
export function Launcher(props: LauncherProps): JSX.Element {
  const { children } = props
  const account = useAccount()

  return (
    <React.StrictMode>
      <LocaleProvider>
        <ThemeProvider theme={account.theme} onChange={(theme) => account.update({ theme })}>
          <React.Suspense fallback={<h1>Loading...</h1>}>
            <AppProvider account={account}>
              {/* Router should be last provider */}
              <RouterProvider>
                { children }
              </RouterProvider>
            </AppProvider>
          </React.Suspense>
        </ThemeProvider>
      </LocaleProvider>
    </React.StrictMode>
  )
}

export default Launcher
