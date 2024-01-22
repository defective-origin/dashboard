import React from 'react'
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Link, { LinkProps } from 'components/Link'
import Tooltip, { TooltipProps } from 'components/Tooltip'

// ---| self |---
import css from './MenuItem.module.scss'

export type MenuItemProps = MuiMenuItemProps &
  Pick<LinkProps, 'start' | 'content' | 'end' | 'size' | 'iconSize' | 'align' | 'fillIcon' | 'color' | 'loading'> & {
    tooltip?: TooltipProps | TooltipProps['content']
  }

/**
 * Component description.
 *
 * How to use
 * @example
 * <Item />
 */
export function MenuItem(props: MenuItemProps): JSX.Element {
  const {
    tooltip,
    align,
    start,
    end,
    size,
    iconSize,
    fillIcon,
    color,
    loading,
    content,
    children,
    className,
    ...otherProps
  } = props
  const _className = cn(css.MenuItem, className)

  const item = (
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
          loading={loading}
        />
      )}
    </MuiMenuItem>
  )

  // TODO: [kseniya_boldak] add open/on flag to tooltip and wrap all items by default
  if (tooltip) {
    const tooltipProps = typeof tooltip === 'object' ? tooltip : { content: tooltip }

    return <Tooltip {...tooltipProps}>{item}</Tooltip>
  }

  return item
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
