import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppDrawer.module.scss'

export type AppDrawerProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppDrawer />
 */
export function AppDrawer(props: AppDrawerProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppDrawer, className)

  return <div className={_className} {...otherProps}>DRAWER{children}</div>
}

AppDrawer.displayName = 'AppDrawer'

export default AppDrawer
