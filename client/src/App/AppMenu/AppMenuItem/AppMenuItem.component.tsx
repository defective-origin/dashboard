import React, { useCallback } from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'
import { useMatch, useNavigate } from 'router'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/lib/Button'
import Tooltip from 'components/lib/Tooltip'

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
  const { href, content, className, ...otherProps } = props
  const app = useLauncher()
  const match = useMatch(href ?? 'not-valid')
  const navigate = useNavigate()
  const _className = cn(css.AppMenuItem, match && css.Active, className)
  const redirect = useCallback(() => href && navigate(href, { replace: true }), [navigate, href])
  const item = (
    <Button
      className={_className}
      content={app.isMenu('opened') && content}
      color='primary'
      size='md'
      iconSize='xl'
      onClick={redirect}
      href={href}
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
