import React, { useCallback } from 'react'
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
  const checkMessage = useCallback(() => app.message({
    content: 'TEST MESSAGE',
    onClose: () => console.log('CLOSE MESSAGE'),
    onSuccess: () => console.log('SUCCESS MESSAGE'),
  }), [app])
  const checkGuard = useCallback(() => app.guard({
    content: 'You have unsaved changes. \n Are you sure you want to leave without save?',
    onClose: () => console.log('CLOSE GUARD'),
    onSuccess: () => console.log('SUCCESS GUARD'),
  }), [app])
  const checkAlert = useCallback(() => {
    app.alert(
      {content: 'Test Text', status: 'error'},
      {content: 'Test Text', status: 'warning'},
      {content: 'Test Text', status: 'info'},
      {content: 'Test Text', status: 'success'},
    )
  }, [app])
  const testActions: Action[] = [
    { key: '3', start: 'close', size: 'xs', variant: 'outlined', content: 'TEST GUARD', color: 'error', onClick: checkGuard },
    { key: '2', start: 'close', size: 'xs', variant: 'outlined', content: 'TEST MESSAGE', color: 'warning', onClick: checkMessage },
    { key: '1', start: 'close', size: 'xs', variant: 'outlined', content: 'TEST ALERT', color: 'info', onClick: checkAlert },
    !app.isAuthorized() && { key: '0', start: 'login', size: 'xs', variant: 'outlined', content: app.t('BUTTONS.LOGIN'), color: 'secondary', onClick: app.login },
  ].filter(Boolean) as Action[]



  return (
    <Block className={_className} direction='x' align='center' padding='sm' {...otherProps}>
      <Text.H1 status='primary'>{app.pageName}</Text.H1>

      <Block.Spacer />

      <Actions items={testActions} gap='xs' />

      {app.isAuthorized() && (
        <Tooltip title={app.t('LINKS.ACCOUNT')}>
          <Button round onClick={app.logout}>
            <Avatar sx={{ width: 36, height: 36 }} alt='user image' />
          </Button>
        </Tooltip>
      )}
    </Block>
  )
}

AppHeader.displayName = 'AppHeader'

export default AppHeader
