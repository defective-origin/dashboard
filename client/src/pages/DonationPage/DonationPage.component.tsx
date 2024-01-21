import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
import BasePage, { BasePageProps } from 'screens/BasePage'

// ---| components |---

// ---| self |---
import css from './DonationPage.module.scss'

export type DonationPageProps = BasePageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <DonationPage />
 */
export function DonationPage(props: DonationPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DonationPage, className)

  return <BasePage className={_className} name='PAGES.DONATION' {...otherProps}>{children}</BasePage>
}

DonationPage.displayName = 'DonationPage'

export default DonationPage
