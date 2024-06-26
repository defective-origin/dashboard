import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Dashboard, useDashboards } from 'api'

// ---| pages |---
import SelectPage, { SelectPageProps } from 'pages/SelectPage'

// ---| screens |---
import DashboardPreviewCard from 'screens/cards/DashboardPreviewCard'

// ---| components |---
// ---| self |---
import css from './DashboardsPage.module.scss'

export type DashboardsPageProps = Partial<SelectPageProps<Dashboard>>

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

  const menu = [
    { start: 'add', tooltip: 'Add Board', tooltipSide: 'right', size: 'lg' },
  ]

  return (
    <SelectPage
      className={_className}
      name='PAGES.DASHBOARDS'
      menu={menu}
      items={boards}
      as={DashboardPreviewCard}
    />
  )
}

DashboardsPage.displayName = 'DashboardsPage'

export default DashboardsPage
