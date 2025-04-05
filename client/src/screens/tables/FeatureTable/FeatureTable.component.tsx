import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { Feature } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Table, { TableProps, TableRowMenuItem } from 'components/views/Table'

// ---| self |---
import css from './FeatureTable.module.scss'
import { FEATURE_COLUMNS } from './FeatureTable.constant'

export type FeatureTableProps<T extends Feature> = TableProps<T>

/**
 * Component description.
 *
 * How to use
 * @example
 * <FeatureTable />
 */
export function FeatureTable<T extends Feature>(props: FeatureTableProps<T>): JSX.Element {
  const { columns, children, className, ...otherProps } = props
  const _className = cn(css.FeatureTable, className)

  const actions = useMemo<TableRowMenuItem[]>(() => [
    { start: 'edit', content: 'Edit' },
    { start: 'delete_forever', content: 'Delete' },
    // add details
  ], [])

  const combinedColumns = useMemo(() => [...FEATURE_COLUMNS, ...(columns ?? [])], [columns])

  return (
    <Table
      className={_className}
      columns={combinedColumns}
      actions={actions}
      pagination
      {...otherProps}
    >
      {children}
    </Table>
  )
}

FeatureTable.displayName = 'FeatureTable'

export default FeatureTable
