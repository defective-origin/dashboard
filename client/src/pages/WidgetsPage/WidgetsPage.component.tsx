import React from 'react'

// ---| core |---
import { t } from 'locale'
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
 *
 * How to use
 * @example
 * <WidgetsPage />
 */
export function WidgetsPage(props: WidgetsPageProps) {
  const { className } = props
  const _className = cn(css.WidgetsPage, className)
  const widgets = useWidgets()

  return (
    <SearchPage
      className={_className}
      name='LABEL.WIDGETS'
      to='WIDGET'
      items={widgets.data}
      onCreate={() => console.log('create')}
    />
  )
}

WidgetsPage.displayName = 'WidgetsPage'

export default WidgetsPage
