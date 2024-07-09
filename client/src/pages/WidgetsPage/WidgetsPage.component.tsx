import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { WidgetPreset, useWidgetViews } from 'api'

// ---| pages |---
import SelectPage, { SelectPageProps } from 'pages/SelectPage'

// ---| screens |---
import WidgetPreviewCard from 'screens/cards/WidgetPreviewCard'

// ---| components |---
// ---| self |---
import css from './WidgetsPage.module.scss'

export type WidgetsPageProps = Partial<SelectPageProps<WidgetPreset>>

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
  const widgets = useWidgetViews()

  return (
    <SelectPage
      menu={[
        { content: 'PRESETS' },
        { content: 'VIEWS' },
      ]}
      className={_className}
      name='PAGES.WIDGETS'
      items={widgets}
      as={WidgetPreviewCard}
    />
  )
}

WidgetsPage.displayName = 'WidgetsPage'

export default WidgetsPage
