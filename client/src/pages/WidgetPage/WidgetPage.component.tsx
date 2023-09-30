import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
import Page, { PageProps } from 'screens/Page'

// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './WidgetPage.module.scss'

export type WidgetPageProps = PageProps & {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetPage />
 */
export function WidgetPage(props: WidgetPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.WidgetPage, className)

  return <Page className={_className} name='PAGES.WIDGETS' {...otherProps}>{children}</Page>
}

WidgetPage.displayName = 'WidgetPage'

export default WidgetPage
