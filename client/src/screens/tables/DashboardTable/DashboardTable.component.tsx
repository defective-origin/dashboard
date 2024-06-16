import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { Dashboard, useDashboards } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Table, { TableProps } from 'components/Table'

// ---| self |---
import css from './DashboardTable.module.scss'
import { DASHBOARD_COLUMNS } from './DashboardTable.constant'
import { TableRowMenuItem } from 'components/Table/TableRowMenu'

export type DashboardTableProps = TableProps<Dashboard>

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardTable />
 */
export function DashboardTable(props: DashboardTableProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DashboardTable, className)
  const dashboards = useDashboards()

  const actions = useMemo<TableRowMenuItem[]>(() => [
    { start: 'edit', content: 'Edit' },
    { start: 'delete', content: 'Delete' },
  ], [])

  return (
    <Table
      className={_className}
      columns={DASHBOARD_COLUMNS}
      items={dashboards}
      loading={dashboards.loading}
      actions={actions}
      pagination
      {...otherProps}
    >
      {children}
    </Table>
  )
}

DashboardTable.displayName = 'DashboardTable'

export default DashboardTable
