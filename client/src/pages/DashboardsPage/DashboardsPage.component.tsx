import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Board, useDashboards } from 'api'

// ---| pages |---
import SearchPage, { SearchPageProps } from 'pages/SearchPage'

// ---| screens |---
import DashboardPreviewCard from 'screens/DashboardPreviewCard'

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
export function DashboardsPage(props: DashboardsPageProps): JSX.Element {
  const { className } = props
  const _className = cn(css.DashboardsPage, className)
  const boards = useDashboards()

  return (
    <SearchPage
      className={_className}
      name='PAGES.DASHBOARDS'
      items={boards}
      as={DashboardPreviewCard}
    />
  )
}

DashboardsPage.displayName = 'DashboardsPage'

export default DashboardsPage
