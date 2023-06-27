import React from 'react'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| root |---
// ---| common |---
// ---| self |---
import './UILauncher.module.scss'

export type UILauncherProps = {
  children?: React.ReactNode
}

/**
 * Setup all ui context providers.
 *
 * How to use
 * @example
 * <UILauncher defaultProp={1} />
 */
export function UILauncher(props: UILauncherProps): JSX.Element {
  const { children } = props

  return (
    <>
      {children}
    </>
  )
}

UILauncher.displayName = 'UILauncher'

export default UILauncher
