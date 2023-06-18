import React from 'react'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| root |---
// ---| common |---
// ---| self |---

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
      { children }
    </React.StrictMode>
  )
}

CoreLauncher.displayName = 'CoreLauncher'

export default CoreLauncher
