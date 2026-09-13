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
 * @example
 * <AccountDashboardsPage />
 */
export function AccountDashboardsPage(props: AccountDashboardsPageProps) {
  const { children, className, ...otherProps } = props

  return (
    <Page className={cn(css.AccountDashboardsPage, className)} name='LABEL.DASHBOARDS' {...otherProps}>
      <Page.Content>
        <DashboardTable />

        {children}
      </Page.Content>
    </Page>
  )
}

AccountDashboardsPage.displayName = 'AccountDashboardsPage'

export default AccountDashboardsPage
