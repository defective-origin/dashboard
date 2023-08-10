import React from 'react'
import { Avatar } from '@mui/material'

// ---| core |---
import { useLauncher } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block from 'components/Block'
import Text from 'components/lib/Text'
import Button from 'components/lib/Button'
import Tooltip from 'components/lib/Tooltip'
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
    <Block className={_className} {...otherProps}>
      <Text.H1 color='primary'>Page Name</Text.H1>

      <Block.Spacer />

      <Actions items={testActions} />

      {app.isAuthorized() && (
        <Tooltip title={app.t('LINKS.ACCOUNT')}>
          <Button sx={{ padding: 0 }} round onClick={app.logout}>
            <Avatar sx={{ width: 36, height: 36 }} alt='user image' />
          </Button>
        </Tooltip>
      )}
      <Button sx={{ padding: 0 }} round size='xs' start='account_circle' onClick={app.logout} />
      <Button sx={{ padding: 0 }} round size='sm' start='account_circle' onClick={app.logout} />
      <Button sx={{ padding: 0 }} round size='md' start='account_circle' onClick={app.logout} />
      <Button sx={{ padding: 0 }} round size='lg' start='account_circle' onClick={app.logout} />
      <Button sx={{ padding: 0 }} round size='xl' start='account_circle' onClick={app.logout} />
      <Button sx={{ padding: 0 }} round size='xs' onClick={app.logout}>
        <Avatar sx={{ width: 36, height: 36 }} alt='user image' />
      </Button>
    </Block>
  )
}

AppHeader.displayName = 'AppHeader'

export default AppHeader
