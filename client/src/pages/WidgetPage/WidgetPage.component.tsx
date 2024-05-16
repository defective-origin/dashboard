import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useWidget } from 'api'
import { useParams } from 'router'

// ---| pages |---
import BasePage, { BasePageProps } from 'pages/BasePage'

// ---| screens |---
// ---| components |---
// ---| self |---
import css from './WidgetPage.module.scss'

export type WidgetPageProps = BasePageProps

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
  const { id } = useParams()
  const widget = useWidget(id)

  return (
    <BasePage className={_className} name={widget.name} {...otherProps}>
      {children}
    </BasePage>
  )
}

WidgetPage.displayName = 'WidgetPage'

export default WidgetPage
