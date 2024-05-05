import React from 'react'
import MuiMenuItem from '@mui/material/MenuItem'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button from 'components/Button'
import Link from 'components/Link'
import NavLink from 'components/NavLink'
import { RepeatItem } from 'components/Repeat'
import { PopupTriggerOptions } from 'components/Popup'

// ---| self |---
import css from './MenuItem.module.scss'

export const MENU_ACTION_MAP = {
  button: Button,
  link: Link,
  nav: NavLink,
}

export type MenuItemProps = RepeatItem<typeof MENU_ACTION_MAP>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Item />
 */
export function MenuItem(props: MenuItemProps & { triggerOptions?: PopupTriggerOptions }): JSX.Element {
  const { triggerOptions: o, active, variant = 'button', className, children, ...otherProps } = props
  const _className = cn(css.MenuItem, className)
  const Tag = MENU_ACTION_MAP[variant] as React.FC<RepeatItem<typeof MENU_ACTION_MAP>>

  return (
    <MuiMenuItem className={_className}>
      {!children && Tag && (
        <Tag size='sm' active={active ?? o?.open} color='primary' align='left' stretch {...otherProps} />
      )}

      {children}
    </MuiMenuItem>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
