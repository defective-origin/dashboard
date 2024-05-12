import React from 'react'
import { Avatar } from '@mui/material'

// ---| core |---
import { useLocale } from 'locale'
import { useApp } from 'App'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block from 'components/Block'
import Portal from 'components/Portal'
import Button from 'components/Button'
import Header, { HeaderProps } from 'components/Header'

// ---| self |---
import css from './AppHeader.module.scss'

export type AppHeaderProps = HeaderProps

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
  const app = useApp()
  const locale = useLocale()

  return (
    <Header className={_className} as='header' area='top' justifies='space-between' {...otherProps}>
      <Block className={css.Content} v='x' aligns='center' p='sm'>
        <Portal.Container name='page-name' />

        {children}
      </Block>

      <Block className={css.Extra} v='x' aligns='center' p='sm'>
        <Portal.Container name='page-menu' />

        {app.isAuthorized() && (
          <Button round onClick={app.logout} tooltip={locale.t('ROUTE.ACCOUNT')}>
            <Avatar sx={{ width: 36, height: 36 }} alt='user image' />
          </Button>
        )}
      </Block>
    </Header>
  )
}

AppHeader.displayName = 'AppHeader'

export default AppHeader
