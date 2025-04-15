import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'
// ---| screens |---
import WidgetTable from 'screens/tables/WidgetTable'
// ---| components |---

// ---| self |---
import css from './AccountWidgetsPage.module.scss'

export type AccountWidgetsPageProps = PageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <AccountWidgetsPage />
 */
export function AccountWidgetsPage(props: AccountWidgetsPageProps) {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AccountWidgetsPage, className)

  return (
    <Page className={_className} name='LABEL.WIDGETS' {...otherProps}>
      <Page.Content>
        <WidgetTable />

        {children}
      </Page.Content>
    </Page>
  )
}

AccountWidgetsPage.displayName = 'AccountWidgetsPage'

export default AccountWidgetsPage
