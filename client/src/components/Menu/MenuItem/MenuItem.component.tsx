import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './MenuItem.module.scss'

export type MenuItemProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <MenuItem />
 */
export function MenuItem(props: MenuItemProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.MenuItem, className)

  return <div className={_className} {...otherProps}>{children}</div>
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
