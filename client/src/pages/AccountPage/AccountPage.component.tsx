import React from 'react'

// ---| core |---
import { cn } from 'tools'
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
export function AccountPage(props: AccountPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AccountPage, className)
  const menu: PageMenuItem[] = [
    { variant: 'nav', content: 'Account', to: 'ACCOUNT' },
    { variant: 'nav', content: 'Widgets', to: 'ACCOUNT_WIDGETS' },
    { variant: 'nav', content: 'Dashboards', to: 'ACCOUNT_BOARDS' },
  ]

  return (
    <Page className={_className} name='PAGES.ACCOUNT' menu={menu} {...otherProps}>
      <Page.Content p='xs'>
        <Outlet />

        {children}
      </Page.Content>
    </Page>
  )
}

AccountPage.displayName = 'AccountPage'

export default AccountPage
