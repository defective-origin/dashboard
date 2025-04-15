import React from 'react'
import MuiMenuItem from '@mui/material/MenuItem'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button from 'components/actions/Button'
import Link from 'components/actions/Link'
import Divider from 'components/layouts/Divider'
import NavLink from 'components/actions/NavLink'
import { RepeatItem } from 'components/layouts/Repeat'
import { PopupTriggerOptions } from 'components/popups/Popup'

// ---| self |---
import css from './MenuItem.module.scss'

export const MENU_ACTION_MAP = {
  divider: Divider,
  button: Button,
  link: Link,
  nav: NavLink,
}

export type MenuItemProps = RepeatItem<typeof MENU_ACTION_MAP> & { triggerOptions?: PopupTriggerOptions }

/**
 * Component description.
 *
 * How to use
 * @example
 * <Item />
 */
export const MenuItem = (props: MenuItemProps) => {
  const { ref, triggerOptions: o, active, variant = 'button', className, children, ...otherProps } = props
  const _className = cn(css.MenuItem, className)
  const Tag = MENU_ACTION_MAP[variant] as React.FC<RepeatItem<typeof MENU_ACTION_MAP>>

  return (
    <MuiMenuItem ref={ref} className={_className}>
      {!children && Tag && (
        <Tag
          size='xxs'
          active={active ?? o?.isOn}
          color='primary'
          align='left'
          stretch
          {...otherProps}
        />
      )}

      {children}
    </MuiMenuItem>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
