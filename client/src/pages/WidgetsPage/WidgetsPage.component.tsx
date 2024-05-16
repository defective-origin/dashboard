import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Widget, useWidgets } from 'api'

// ---| pages |---
import SearchPage, { SearchPageProps } from 'pages/SearchPage'

// ---| screens |---
import WidgetPreviewCard from 'screens/WidgetPreviewCard'

// ---| components |---
// ---| self |---
import css from './WidgetsPage.module.scss'

export type WidgetsPageProps = Partial<SearchPageProps<Widget>>

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
  const widgets = useWidgets()

  return (
    <SearchPage
      className={_className}
      name='PAGES.WIDGETS'
      items={widgets}
      as={WidgetPreviewCard}
    />
  )
}

WidgetsPage.displayName = 'WidgetsPage'

export default WidgetsPage
