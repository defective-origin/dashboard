import React from 'react'
import { Avatar } from '@mui/material'

// ---| core |---
import { useLauncher } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block from 'components/Block'
import Text from 'components/Text'
import Button from 'components/Button'
import Tooltip from 'components/Tooltip'
import Actions, { Action } from 'components/Actions'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppHeader.module.scss'

export type AppHeaderProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppHeader />
 */
export function AppHeader(props: AppHeaderProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppHeader, className)
  const app = useLauncher()
  const testActions: Action[] = [
    !app.isAuthorized() && { key: '0', start: 'login', size: 'xs', variant: 'outlined', content: app.t('BUTTONS.LOGIN'), color: 'secondary', onClick: app.login },
  ].filter(Boolean) as Action[]

  return (
    <Block className={_className} direction='x' align='center' {...otherProps}>
      <Text.H1 status='primary'>{app.pageName}</Text.H1>

      <Block.Spacer />

      <Actions items={testActions} />

      {app.isAuthorized() && (
        <Tooltip title={app.t('LINKS.ACCOUNT')}>
          <Button sx={{ padding: 0 }} round onClick={app.logout}>
            <Avatar sx={{ width: 36, height: 36 }} alt='user image' />
          </Button>
        </Tooltip>
      )}
    </Block>
  )
}

AppHeader.displayName = 'AppHeader'

export default AppHeader
