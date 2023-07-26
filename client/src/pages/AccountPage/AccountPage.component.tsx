import React from 'react'

// ---| core |---
import { RouteProps } from 'router'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AccountPage.module.scss'

export type AccountPageProps = RouteProps & {
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
  const { navigate, children, className, ...otherProps } = props
  const _className = cn(css.AccountPage, className)

  return <div className={_className} {...otherProps}>{children}</div>
}

AccountPage.displayName = 'AccountPage'

export default AccountPage
