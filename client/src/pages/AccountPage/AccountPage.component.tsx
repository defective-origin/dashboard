import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

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

  return <Page className={_className} name='PAGES.ACCOUNT' {...otherProps}>{children}</Page>
}

AccountPage.displayName = 'AccountPage'

export default AccountPage
