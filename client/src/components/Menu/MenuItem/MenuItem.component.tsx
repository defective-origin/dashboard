import React from 'react'
import MuiMenuItem from '@mui/material/MenuItem'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Action, { ActionProps } from 'components/Action'

// ---| self |---
import css from './MenuItem.module.scss'

export type MenuItemProps = ActionProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <Item />
 */
export function MenuItem(props: MenuItemProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.MenuItem, className)

  // FIXME: implement via variant link | button
  return <Action as={MuiMenuItem} className={_className} {...otherProps} />
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
