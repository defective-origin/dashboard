import React from 'react'
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Link, { LinkProps } from 'components/Link'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './MenuItem.module.scss'

export type MenuItemProps = MuiMenuItemProps &
  Pick<LinkProps, 'start' | 'content' | 'end' | 'size' | 'iconSize' | 'align' | 'fillIcon' | 'color'>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Item />
 */
export function MenuItem(props: MenuItemProps): JSX.Element {
  const {
    align,
    start,
    end,
    size,
    iconSize,
    fillIcon,
    color,
    content,
    children,
    className,
    ...otherProps
  } = props
  const _className = cn(css.MenuItem, className)

  return (
    <MuiMenuItem className={_className} {...otherProps}>
      {children ?? (
        <Link
          start={start}
          content={content}
          end={end}
          size={size}
          iconSize={iconSize}
          align={align}
          fillIcon={fillIcon}
          color={color}
        />
      )}
    </MuiMenuItem>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
