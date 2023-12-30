import React from 'react'
import {
  MenuItemProps,
  Menu as MuiMenu,
  MenuList as MuiMenuList,
  MenuProps as MuiMenuProps,
} from '@mui/material'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat from 'components/Repeat'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Menu.module.scss'
import MenuItem from './MenuItem'

export type MenuProps = MuiMenuProps & {
  className?: string
  children?: React.ReactNode
  anchorEl?: HTMLElement | null
  popup?: boolean
  items?: MenuItemProps[]
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
