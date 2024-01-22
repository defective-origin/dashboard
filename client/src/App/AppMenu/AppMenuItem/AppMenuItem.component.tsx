import React from 'react'

// ---| core |---
import { NavLink, useMatch } from 'router'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/Button'

// ---| self |---
import css from './AppMenuItem.module.scss'

export type AppMenuItemProps = ButtonProps & {
  className?: string
  content?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppMenuItem />
 */
export function AppMenuItem(props: AppMenuItemProps): JSX.Element {
  const { tooltip, href, content, fillIcon, className, ...otherProps } = props
  const isActive = !!useMatch(href ?? 'HAS_NO_MATCH')
  const _className = cn(css.AppMenuItem, className)

  // TODO: если активный или открыто подменю, то заполнять иконки (language)
  // TODO: [kseniya_boldak] Add text converters to text component

  return (
    <Button
      className={_className}
      color='primary'
      size='md'
      iconSize='lg'
      v='text'
      fillIcon={fillIcon ?? isActive}
      tooltip={{content: tooltip.toUpperCase(), placement: 'right'}}
      as={NavLink}
      to={href}
      {...otherProps} />
  )
}

AppMenuItem.displayName = 'AppMenuItem'

export default AppMenuItem
