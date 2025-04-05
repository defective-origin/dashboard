import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { Board, useBoards } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Table, { TableProps } from 'components/views/Table'

// ---| self |---
import css from './DashboardTable.module.scss'
import { DASHBOARD_COLUMNS } from './DashboardTable.constant'
import FeatureTable, { FeatureTableProps } from '../FeatureTable'

export type DashboardTableProps = FeatureTableProps<Board>

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardTable />
 */
export function DashboardTable(props: DashboardTableProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.DashboardTable, className)
  const boards = useBoards()

  return (
    <FeatureTable
      className={_className}
      columns={DASHBOARD_COLUMNS}
      items={boards.data}
      loading={boards.isLoading}
      {...otherProps}
    />
  )
}

DashboardTable.displayName = 'DashboardTable'

export default DashboardTable
