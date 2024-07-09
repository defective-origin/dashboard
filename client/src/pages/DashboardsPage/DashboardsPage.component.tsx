import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Board, useBoards } from 'api'

// ---| pages |---
import SelectPage, { SelectPageProps } from 'pages/SelectPage'

// ---| screens |---
import DashboardPreviewCard from 'screens/cards/DashboardPreviewCard'

// ---| components |---
// ---| self |---
import css from './DashboardsPage.module.scss'

export type DashboardsPageProps = Partial<SelectPageProps<Board>>

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
  const boards = useBoards()

  return (
    <SelectPage
      className={_className}
      name='PAGES.DASHBOARDS'
      menu={[{ start: 'add', tooltip: 'Add Board', tooltipSide: 'right', size: 'lg' }]}
      items={boards.data}
      as={DashboardPreviewCard}
    />
  )
}

DashboardsPage.displayName = 'DashboardsPage'

export default DashboardsPage
