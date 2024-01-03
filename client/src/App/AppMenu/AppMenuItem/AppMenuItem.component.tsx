import React from 'react'

// ---| core |---
import { NavLink, useMatch } from 'router'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/Button'
import Tooltip from 'components/Tooltip'

// ---| common |---
import { cn } from 'common/tools'

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
  const { href, content, fillIcon, className, ...otherProps } = props
  const isActive = !!useMatch(href ?? 'HAS_NO_MATCH')
  const _className = cn(css.AppMenuItem, className)
  const commonProps: ButtonProps = {
    color: 'primary',
    size: 'md',
    iconSize: 'lg',
    variant: 'text',
    className: _className,
    fillIcon: fillIcon ?? isActive,
    ...otherProps,
  }

  // TODO: если активный или открыто подменю, то заполнять иконки (language)

  return (
    <Tooltip title={content} placement='right'>
      {href && <Button component={NavLink} to={href} {...commonProps} />}

      {!href && <Button {...commonProps} />}
    </Tooltip>
  )
}

AppMenuItem.displayName = 'AppMenuItem'

export default AppMenuItem
