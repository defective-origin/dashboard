import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Widget, useWidgets } from 'api'

// ---| pages |---
import SearchPage, { SearchPageProps } from 'pages/SearchPage'

// ---| screens |---
// ---| components |---
// ---| self |---
import css from './WidgetsPage.module.scss'

export type WidgetsPageProps = Partial<SearchPageProps<Widget>>

/**
 * Component description.
 * @example
 * <WidgetsPage />
 */
export function WidgetsPage(props: WidgetsPageProps) {
  const { className } = props
  const widgets = useWidgets()

  return (
    <SearchPage
      className={cn(css.WidgetsPage, className)}
      name='LABEL.WIDGETS'
      to='WIDGET'
      items={widgets.data}
      onCreate={() => console.log('create')}
    />
  )
}

WidgetsPage.displayName = 'WidgetsPage'

export default WidgetsPage
