import React from 'react'

// ---| core |---
import { RouteProps } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './GuidePage.module.scss'

export type GuidePageProps = RouteProps & {
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
  const { children, className, ...otherProps } = props
  const _className = cn(css.GuidePage, className)

  return <div className={_className} {...otherProps}>{children}</div>
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
