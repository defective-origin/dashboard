import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
import BasePage, { BasePageProps } from 'screens/BasePage'

// ---| components |---

// ---| self |---
import css from './SupportPage.module.scss'

export type SupportPageProps = BasePageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <SupportPage />
 */
export function SupportPage(props: SupportPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.SupportPage, className)

  return <BasePage className={_className} name='PAGES.SUPPORT' {...otherProps}>{children}</BasePage>
}

SupportPage.displayName = 'SupportPage'

export default SupportPage
