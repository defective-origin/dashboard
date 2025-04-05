import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useWidgetViews } from 'api'

// ---| pages |---
import SelectPage from 'pages/SearchPage'

// ---| screens |---
// ---| components |---

// ---| self |---
import css from './WidgetViewsPage.module.scss'

export type WidgetViewsPageProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetViewsPage />
 */
export function WidgetViewsPage(props: WidgetViewsPageProps): JSX.Element {
  const { className } = props
  const _className = cn(css.WidgetViewsPage, className)
  const widgetViews = useWidgetViews()

  return (
    <SelectPage
      className={_className}
      name='PAGES.WIDGET_VIEWS'
      to='WIDGET_VIEW'
      items={widgetViews.data}
    />
  )
}

WidgetViewsPage.displayName = 'WidgetViewsPage'

export default WidgetViewsPage
