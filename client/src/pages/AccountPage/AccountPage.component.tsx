import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
import Page, { PageProps } from 'screens/Page'

// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AccountPage.module.scss'

export type AccountPageProps = PageProps & {
  className?: string
  children?: React.ReactNode
}

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
