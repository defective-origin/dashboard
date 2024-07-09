import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useApp } from 'App'
import { t } from 'locale'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Menu from 'components/Menu'
import Avatar from 'components/Avatar'
import NavLink from 'components/NavLink'

// ---| self |---
import css from './Account.module.scss'

export type AccountProps = {
  open?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Account />
 */
export function Account(props: AccountProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Account, className)
  const app = useApp()

  return (
    <Menu
      className={_className}
      v='right'
      trigger={o => (
        app.isAuthorized()
          ? (
            <NavLink variant='nav' to='ACCOUNT' active={o.open} size='lg'>
              <Avatar size='lg' />
            </NavLink>
          )
          : (
            <NavLink variant='button' start='person' active={o.open} size='lg' onClick={app.login} />
          )

      )}
      {...otherProps}
    >
      <div>
        {!app.isAuthorized() && <Menu.Item start='login' content={t('ACTION.LOGIN')} onClick={app.login} />}

        {app.isAuthorized() && (
          <>
            <Menu.Item variant='nav' start='person' to='ACCOUNT' content={t('ROUTE.ACCOUNT')} />
            <Menu.Item variant='nav' start='insert_chart' to='ACCOUNT_WIDGETS' content={t('ROUTE.WIDGETS')} />
            <Menu.Item variant='nav' start='dashboard' to='ACCOUNT_BOARDS' content={t('ROUTE.BOARDS')} />
            <Menu.Item variant='button' start='logout' content={t('ACTION.LOGOUT')} onClick={app.logout} />
          </>
        )}
        {children}
      </div>
    </Menu>
  )
}

Account.displayName = 'Account'

export default Account
