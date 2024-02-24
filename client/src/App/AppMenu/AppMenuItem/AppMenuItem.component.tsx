import React from 'react'

// ---| core |---
import { NavLink, useMatch } from 'router'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button from 'components/Button'
import Action, { ActionProps } from 'components/Action'

// ---| self |---
import css from './AppMenuItem.module.scss'

export type AppMenuItemProps = Omit<ActionProps, 'tooltip'> & {
  tooltip?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppMenuItem />
 */
export function AppMenuItem(props: AppMenuItemProps): JSX.Element {
  const { tooltip, href, fillIcon, className, ...otherProps } = props
  const isActive = !!useMatch(href ?? 'HAS_NO_MATCH')
  const _className = cn(css.AppMenuItem, className)
  const actionProps = {
    className: _className,
    color: 'primary',
    size: 'lg',
    tooltip: {content: tooltip?.toUpperCase(), placement: 'right'},
    fillIcon: fillIcon ?? isActive,
    ...otherProps,
  } as ActionProps
  // TODO: если активный или открыто подменю, то заполнять иконки (language)
  // TODO: [kseniya_boldak] Add text converters to text component

  if (href) {
    return <Action as={NavLink} to={href} {...actionProps} />
  }

  return <Button v='text' {...actionProps} />
}

AppMenuItem.displayName = 'AppMenuItem'

export default AppMenuItem
