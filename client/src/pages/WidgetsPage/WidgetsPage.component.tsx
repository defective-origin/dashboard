import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { WidgetView, useWidgetViews } from 'api'

// ---| pages |---
import SelectPage, { SelectPageProps } from 'pages/SelectPage'

// ---| screens |---
import WidgetPreviewCard from 'screens/cards/WidgetPreviewCard'

// ---| components |---
// ---| self |---
import css from './WidgetsPage.module.scss'

export type WidgetsPageProps = Partial<SelectPageProps<WidgetView>>

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetsPage />
 */
export function WidgetsPage(props: WidgetsPageProps): JSX.Element {
  const { className } = props
  const _className = cn(css.WidgetsPage, className)
  const widgetViews = useWidgetViews()

  return (
    <SelectPage
      menu={[{ start: 'add', tooltip: 'Add Widget', tooltipSide: 'right', size: 'lg' }]}
      className={_className}
      name='PAGES.WIDGETS'
      items={widgetViews.data}
      as={WidgetPreviewCard}
    />
  )
}

WidgetsPage.displayName = 'WidgetsPage'

export default WidgetsPage
