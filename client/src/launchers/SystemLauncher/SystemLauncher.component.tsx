import React from 'react'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| root |---
// ---| common |---
// ---| self |---

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

  return <>{children}</>
}

SystemLauncher.displayName = 'SystemLauncher'

export default SystemLauncher
