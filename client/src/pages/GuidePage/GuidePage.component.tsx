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
import css from './GuidePage.module.scss'

export type GuidePageProps = RouteProps & PageProps & {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <GuidePage />
 */
export function GuidePage(props: GuidePageProps): JSX.Element {
  const { navigate, children, className, ...otherProps } = props
  const _className = cn(css.GuidePage, className)

  return <Page className={_className} name='PAGES.GUIDE' {...otherProps}>{children}</Page>
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
