import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useAccount } from 'api'
import { AppLink, Outlet } from 'router'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'
// ---| screens |---
// ---| components |---
import Button from 'components/actions/Button'

// ---| self |---
import css from './AccountPage.module.scss'

export type AccountPageProps = PageProps

/**
 * Component description.
 * @example
 * <AccountPage />
 */
export function AccountPage(props: AccountPageProps) {
  const { children, className, ...otherProps } = props
  const account = useAccount()

  return (
    <Page
      className={cn(css.AccountPage, className)}
      name='LABEL.ACCOUNT'
      extra={[
        <AppLink start='person' to='ACCOUNT' />,
        <AppLink start='data_thresholding' to='APPS' />,
        <AppLink start='insert_chart' to='ACCOUNT_WIDGETS' />,
        <AppLink start='dashboard' to='ACCOUNT_BOARDS' />,
        <Button start='logout' onClick={account.logout} />,
      ]}
      {...otherProps}
    >
      <Page.Content p='xs'>
        <Outlet />

        {children}
      </Page.Content>
    </Page>
  )
}

AccountPage.displayName = 'AccountPage'

export default AccountPage
