import React from 'react'

// ---| core |---
import { RouteProps } from 'router'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './SupportPage.module.scss'

export type SupportPageProps = RouteProps & {
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
  const { navigate, children, className, ...otherProps } = props
  const _className = cn(css.SupportPage, className)

  return <div className={_className} {...otherProps}>{children}</div>
}

SupportPage.displayName = 'SupportPage'

export default SupportPage
