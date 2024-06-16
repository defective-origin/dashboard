import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import DashboardTable from 'screens/tables/DashboardTable'

// ---| components |---
// ---| self |---
import css from './AccountDashboardsPage.module.scss'

export type AccountDashboardsPageProps = PageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <AccountDashboardsPage />
 */
export function AccountDashboardsPage(props: AccountDashboardsPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AccountDashboardsPage, className)

  return (
    <Page className={_className} name='PAGES.DASHBOARDS' {...otherProps}>
      <Page.Content>
        <DashboardTable />

        {children}
      </Page.Content>
    </Page>
  )
}

AccountDashboardsPage.displayName = 'AccountDashboardsPage'

export default AccountDashboardsPage
