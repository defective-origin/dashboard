import React from 'react'

// ---| core |---
import { RouteProps } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './DashboardPage.module.scss'

export type DashboardPageProps = RouteProps & {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardPage />
 */
export function DashboardPage(props: DashboardPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DashboardPage, className)

  return <div className={_className} {...otherProps}>{children}</div>
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
