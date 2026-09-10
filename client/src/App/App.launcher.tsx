import React from 'react'

// ---| core |---
import RouterProvider, { createMemoryRouter, RouterProviderProps } from 'router/router.context'
import LocaleProvider, { LocaleProviderProps } from 'locale/locale.context'
import ThemeProvider, { ThemeProviderProps } from 'theme/theme.context'
import ApiProvider, { ApiProviderProps, QueryClient } from 'api/api.context'

export type LauncherProps
  = ApiProviderProps
  & LocaleProviderProps
  & ThemeProviderProps
  & RouterProviderProps

/**
 * Run all providers.
 *
 * How to use
 * @example
 * <Launcher />
 */
export function Launcher(props: LauncherProps) {
  const { client, i18n, theme, router } = props

  return (
    <React.StrictMode>
      <ApiProvider client={client}>
        <LocaleProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <React.Suspense fallback={<h1>Loading...</h1>}>
              {/* Router should be last provider */}
              <RouterProvider router={router} />
            </React.Suspense>
          </ThemeProvider>
        </LocaleProvider>
      </ApiProvider>
    </React.StrictMode>
  )
}


/** Launcher for tests and storybook */
export const MockLauncher = (props: LauncherProps) => {
  const { children, theme } = props
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
    },
  })

  const router = createMemoryRouter(
    [{ path: '*', element: children }],
    { initialEntries: ['/'] },
  )

  return <Launcher client={client} router={router} theme={theme} />
}

export default Launcher
