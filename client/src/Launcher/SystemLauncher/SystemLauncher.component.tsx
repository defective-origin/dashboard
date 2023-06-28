import React from 'react'

// ---| self |---
import RouterProvider from './RouterProvider'
import { HotKeysProvider } from './HotKeysProvider'
import LocaleProvider from './LocaleProvider'

export type SystemLauncherProps = {
  children?: React.ReactNode
}

/**
 * Setup all system context providers.
 *
 * How to use
 * @example
 * <SystemLauncher defaultProp={1} />
 */
export function SystemLauncher(props: SystemLauncherProps): JSX.Element {
  const { children } = props

  return (
    <React.StrictMode>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <RouterProvider>
          <LocaleProvider>
            <HotKeysProvider>
              { children }
            </HotKeysProvider>
          </LocaleProvider>
        </RouterProvider>
      </React.Suspense>
    </React.StrictMode>
  )
}

SystemLauncher.displayName = 'SystemLauncher'

export default SystemLauncher
