import React from 'react'
import { Avatar } from '@mui/material'

// ---| core |---
import { useLocale } from 'locale'
import { useLauncher } from 'Launcher'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block from 'components/Block'
import Portal from 'components/Portal'
import Button from 'components/Button'

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
  const locale = useLocale()

  return (
    <Block className={_className} direction='x' align='center' padding='sm' justify='space-between' {...otherProps}>
      <Block className={css.Content} direction='x' align='center' padding='sm'>
        <Portal.Container name='page-name' />

        {children}
      </Block>

      <Block className={css.Extra} direction='x' align='center' padding='sm'>
        <Portal.Container name='page-actions' />

        {app.isAuthorized() && (
          <Button round onClick={app.logout} tooltip={locale.t('LINKS.ACCOUNT')}>
            <Avatar sx={{ width: 36, height: 36 }} alt='user image' />
          </Button>
        )}
      </Block>
    </Block>
  )
}

AppHeader.displayName = 'AppHeader'

export default AppHeader
