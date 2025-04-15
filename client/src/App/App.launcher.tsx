import React from 'react'

// ---| core |---
import RouterProvider from 'router/router.context'
import LocaleProvider from 'locale/locale.context'
import ThemeProvider from 'theme/theme.context'
import ApiProvider from 'api/api.context'

export type LauncherProps = React.PropsWithChildren

/**
 * Run all providers.
 *
 * How to use
 * @example
 * <Launcher />
 */
export function Launcher(props: LauncherProps) {
  const { children } = props

  return (
    <React.StrictMode>
      <ApiProvider>
        <LocaleProvider>
          <ThemeProvider>
            <React.Suspense fallback={<h1>Loading...</h1>}>
              {/* Router should be last provider */}
              <RouterProvider>
                { children }
              </RouterProvider>
            </React.Suspense>
          </ThemeProvider>
        </LocaleProvider>
      </ApiProvider>
    </React.StrictMode>
  )
}

export default Launcher
