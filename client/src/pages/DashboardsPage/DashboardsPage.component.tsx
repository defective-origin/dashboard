import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { Board, useBoards } from 'api'

// ---| pages |---
import SearchPage, { SearchPageProps } from 'pages/SearchPage'

// ---| screens |---
// ---| components |---
// ---| self |---
import css from './DashboardsPage.module.scss'

export type DashboardsPageProps = Partial<SearchPageProps<Board>>

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardsPage />
 */
export function DashboardsPage(props: DashboardsPageProps) {
  const { className } = props
  const _className = cn(css.DashboardsPage, className)
  const boards = useBoards()

  // TODO: add markups to preview card

  return (
    <SearchPage
      className={_className}
      name='LABEL.DASHBOARDS'
      to='BOARD'
      items={boards.data}
      onCreate={() => console.log('create')}
    />
  )
}

DashboardsPage.displayName = 'DashboardsPage'

export default DashboardsPage
