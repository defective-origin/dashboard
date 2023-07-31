import React from 'react'
import { IconButton, Avatar } from '@mui/material'

// ---| core |---
import { useLauncher } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Logo from 'components/Logo'
import Block from 'components/Block'
import Text from 'components/lib/Text'
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
    !app.isAuthorized() && { key: '4', icon: 'login', size: 'xs', variant: 'outlined', content: app.t('BUTTONS.LOGIN'), color: 'secondary', onClick: app.login },
  ].filter(Boolean) as Action[]

  return (
    <Block className={_className} {...otherProps}>
      <Block.Start>
        <Logo icon='logo_dev' href='/' content='logo' />
        <Text.H1 color='primary'>Page Name</Text.H1>
      </Block.Start>
      <Block.Center>{children}</Block.Center>
      <Block.End className={css.End}>
        <Actions items={testActions} />

        {app.isAuthorized() && (
          <Tooltip title={app.t('LINKS.ACCOUNT')}>
            <IconButton sx={{ padding: 0 }} onClick={app.logout}>
              <Avatar sx={{ width: 36, height: 36 }} alt='user image' />
            </IconButton>
          </Tooltip>
        )}
      </Block.End>
    </Block>
  )
}

AppHeader.displayName = 'AppHeader'

export default AppHeader
