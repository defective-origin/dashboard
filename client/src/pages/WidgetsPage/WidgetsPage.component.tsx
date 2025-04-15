import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Widget, useWidgets } from 'api'

// ---| pages |---
import SelectPage, { SelectPageProps } from 'pages/SearchPage'

// ---| screens |---
// ---| components |---
// ---| self |---
import css from './WidgetsPage.module.scss'

export type WidgetsPageProps = Partial<SelectPageProps<Widget>>

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetsPage />
 */
export function WidgetsPage(props: WidgetsPageProps) {
  const { className } = props
  const _className = cn(css.WidgetsPage, className)
  const widgetViews = useWidgets()

  return (
    <SelectPage
      className={_className}
      name='LABEL.WIDGETS'
      to='WIDGET'
      items={widgetViews.data}
    />
  )
}

WidgetsPage.displayName = 'WidgetsPage'

export default WidgetsPage
