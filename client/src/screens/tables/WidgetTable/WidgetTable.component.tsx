import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { Widget, useWidgets } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Table, { TableProps, TableRowMenuItem } from 'components/Table'

// ---| self |---
import css from './WidgetTable.module.scss'
import { WIDGET_COLUMNS } from './WidgetTable.constant'

export type WidgetTableProps = TableProps<Widget>

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetTable />
 */
export function WidgetTable(props: WidgetTableProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.WidgetTable, className)
  const dashboards = useWidgets()

  const actions = useMemo<TableRowMenuItem[]>(() => [
    { start: 'edit', content: 'Edit' },
    { start: 'delete', content: 'Delete' },
  ], [])

  return (
    <Table
      className={_className}
      columns={WIDGET_COLUMNS}
      items={dashboards}
      actions={actions}
      loading={dashboards.loading}
      pagination
      {...otherProps}
    >
      {children}
    </Table>
  )
}

WidgetTable.displayName = 'WidgetTable'

export default WidgetTable
