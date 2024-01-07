import React from 'react'
import MuiMenuItem, {
  MenuItemProps as MuiMenuItemProps,
} from '@mui/material/MenuItem'

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
  Pick<LinkProps, 'start' | 'content' | 'end' | 'size' | 'iconSize' | 'align'>

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
    content,
    className,
    ...otherProps
  } = props
  const _className = cn(css.MenuItem, className)

  return (
    <MuiMenuItem className={_className} {...otherProps}>
      <Link
        width='inherit'
        start={start}
        content={content}
        end={end}
        size={size}
        iconSize={iconSize}
        align={align}
      />
    </MuiMenuItem>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
