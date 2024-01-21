import React from 'react'
import {
  Menu as MuiMenu,
  MenuList as MuiMenuList,
  MenuProps as MuiMenuProps,
} from '@mui/material'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat, { ComponentWithItems } from 'components/Repeat'

// ---| self |---
import css from './Menu.module.scss'
import MenuItem, { MenuItemProps } from './MenuItem'

export type MenuItem = MenuItemProps

export type MenuProps = ComponentWithItems<MuiMenuProps, MenuItem> & {
  className?: string
  children?: React.ReactNode
  anchorEl?: HTMLElement | null
  popup?: boolean
  onClose?: () => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Menu />
 */
export function Menu(props: MenuProps): JSX.Element {
  const { popup, items, children, className, ...otherProps } = props
  const _className = cn(css.Menu, className)
  const Tag = popup ? MuiMenu : MuiMenuList

  return (
    <Tag className={_className} {...(otherProps as any)}>
      <Repeat cmp={Menu.Item} items={items} />

      {children}
    </Tag>
  )
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default Menu
