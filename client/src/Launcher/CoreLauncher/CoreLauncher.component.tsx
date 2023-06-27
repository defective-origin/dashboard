import React, { Suspense } from 'react'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---

// ---| self |---
import RouterProvider from './RouterProvider'

export type CoreLauncherProps = {
  children?: React.ReactNode
}

/**
 * Setup all framework and root context providers.
 *
 * How to use
 * @example
 * <CoreLauncher defaultProp={1} />
 */
export function CoreLauncher(props: CoreLauncherProps): JSX.Element {
  const { children } = props

  return (
    <React.StrictMode>
      <Suspense fallback={<h1>Loading...</h1>}>
        <RouterProvider>
          { children }
        </RouterProvider>
      </Suspense>
    </React.StrictMode>
  )
}

CoreLauncher.displayName = 'CoreLauncher'

export default CoreLauncher
