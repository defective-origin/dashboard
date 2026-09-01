import React from 'react'
import { QueryClient } from '@tanstack/react-query'
import { createMemoryRouter } from 'react-router-dom'

// ---| core |---
import RouterProvider, { RouterProviderProps } from 'router/router.context'
import LocaleProvider, { LocaleProviderProps } from 'locale/locale.context'
import ThemeProvider, { ThemeProviderProps } from 'theme/theme.context'
import ApiProvider, { ApiProviderProps } from 'api/api.context'

export type LauncherProps = 
& ApiProviderProps
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


export type MockLauncherProps = LauncherProps & {
  // If the component requires a specific URL (e.g. for useMatch or useParams)
  route?: string;
}

/** Launcher for tests and storybook */
export const MockLauncher = (props: MockLauncherProps) => {
  const { children, theme, route = '/' } = props
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
    },
  });

  const router = createMemoryRouter(
    [{ path: '*', element: children }],
    { initialEntries: [route] }
  );

  return <Launcher client={client} router={router} theme={theme} />
};

export default Launcher
