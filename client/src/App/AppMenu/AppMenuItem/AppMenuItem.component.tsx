import React, { useCallback } from 'react'

// ---| core |---
import Divider from 'components/lib/Divider'
import Button from 'components/lib/Button'
import { useLauncher } from 'Launcher'
import { useMatch, useNavigate } from 'router'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconTypes } from 'components/lib/Icon'
import Tooltip from 'components/lib/Tooltip'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppMenuItem.module.scss'

export type AppMenuItemProps = {
  className?: string
  icon?: IconTypes
  content?: React.ReactNode
  to?: string
  onClick?: () => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppMenuItem />
 */
export function AppMenuItem(props: AppMenuItemProps): JSX.Element {
  const { to, icon, content, className, ...otherProps } = props
  const app = useLauncher()
  const match = useMatch(to ?? 'not-valid')
  const navigate = useNavigate()
  const _className = cn(css.AppMenuItem, match && css.Active, app.isMenu('opened') && css.Open, className)
  const redirect = useCallback(() => to && navigate(to, { replace: true }), [navigate, to])
  const item = (
    <Button
      className={_className}
      prefix={icon}
      content={app.isMenu('opened') && content}
      color='primary'
      size='md'
      iconSize='xl'
      onClick={redirect}
      {...otherProps}
    />
  )

  if (app.isMenu('closed')) {
    return (
      <Tooltip title={content} placement='right'>
        {item}
      </Tooltip>
    )
  }

  return item
}

AppMenuItem.displayName = 'AppMenuItem'

export default AppMenuItem
