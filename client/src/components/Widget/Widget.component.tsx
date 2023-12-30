import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Widget.module.scss'

export type WidgetProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Widget />
 */
export function Widget(props: WidgetProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Widget, className)

  return <div className={_className} {...otherProps}>{children}</div>
}

Widget.displayName = 'Widget'

export default Widget
