import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
import BasePage, { BasePageProps } from 'screens/BasePage'

// ---| components |---

// ---| self |---
import css from './AccountPage.module.scss'

export type AccountPageProps = BasePageProps

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

  return <BasePage className={_className} name='PAGES.ACCOUNT' {...otherProps}>{children}</BasePage>
}

AccountPage.displayName = 'AccountPage'

export default AccountPage
