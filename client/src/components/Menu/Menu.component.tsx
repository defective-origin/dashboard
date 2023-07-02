import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Menu.module.scss'
import MenuItem, { MenuItemProps } from './MenuItem'

export type MenuProps = {
  className?: string
  children?: React.ReactNode
  items?: MenuItemProps[]
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Menu />
 */
export function Menu(props: MenuProps): JSX.Element {
  const { items, children, className, ...otherProps } = props
  const _className = cn(css.Menu, className)

  return (
    <div className={_className} {...otherProps}>
      {items?.map((item) => <Menu.Item {...item} />)}

      {children}
    </div>
  )
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default Menu
