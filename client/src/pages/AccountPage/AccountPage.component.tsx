import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useAccount } from 'api'
import { Outlet } from 'router'

// ---| pages |---
import Page, { PageMenuItem, PageProps } from 'pages/Page'
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './AccountPage.module.scss'

export type AccountPageProps = PageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <AccountPage />
 */
export function AccountPage(props: AccountPageProps) {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AccountPage, className)
  const account = useAccount()

  const menu: PageMenuItem[] = [
    { variant: 'nav', start: 'person', to: 'ACCOUNT' },
    { variant: 'nav', start: 'data_thresholding' },
    { variant: 'nav', start: 'insert_chart', to: 'ACCOUNT_WIDGETS' },
    { variant: 'nav', start: 'dashboard', to: 'ACCOUNT_BOARDS' },
    { start: 'logout', onClick: account.logout },
  ]

  return (
    <Page className={_className} name='LABEL.ACCOUNT' menu={menu} {...otherProps}>
      <Page.Content p='xs'>
        <Outlet />

        {children}
      </Page.Content>
    </Page>
  )
}

AccountPage.displayName = 'AccountPage'

export default AccountPage
