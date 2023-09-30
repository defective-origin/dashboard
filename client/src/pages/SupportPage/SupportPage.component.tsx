import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
import Page, { PageProps } from 'screens/Page'

// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './SupportPage.module.scss'

export type SupportPageProps = PageProps & {
  className?: string
  children?: React.ReactNode
}

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

  return <Page className={_className} name='PAGES.SUPPORT' {...otherProps}>{children}</Page>
}

SupportPage.displayName = 'SupportPage'

export default SupportPage
