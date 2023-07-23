import React from 'react'

// ---| core |---
import { RouteProps } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './WidgetPage.module.scss'

export type WidgetPageProps = RouteProps & {
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

  return <div className={_className} {...otherProps}>{children}</div>
}

WidgetPage.displayName = 'WidgetPage'

export default WidgetPage
