import React from 'react'

// ---| core |---
import { RouteProps } from 'router'

// ---| pages |---
// ---| screens |---
import Page, { PageProps } from 'screens/Page'

// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './DonationPage.module.scss'

export type DonationPageProps = RouteProps & PageProps & {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <DonationPage />
 */
export function DonationPage(props: DonationPageProps): JSX.Element {
  const { navigate, children, className, ...otherProps } = props
  const _className = cn(css.DonationPage, className)

  return <Page className={_className} name='PAGES.DONATION' {...otherProps}>{children}</Page>
}

DonationPage.displayName = 'DonationPage'

export default DonationPage
