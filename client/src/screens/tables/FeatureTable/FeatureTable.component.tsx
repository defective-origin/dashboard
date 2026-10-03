import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { Feature } from 'api'

// ---| screens |---
// ---| components |---
import Button from 'components/actions/Button'
import Table, { TableProps } from 'components/views/Table'

// ---| self |---
import css from './FeatureTable.module.scss'
import { FEATURE_COLUMNS } from './FeatureTable.constants'

export type FeatureTableProps<T extends Feature> = TableProps<T>

/**
 * Component description.
 * @example
 * <FeatureTable />
 */
export function FeatureTable<T extends Feature>(props: FeatureTableProps<T>) {
  const { columns, children, className, ...otherProps } = props

  const combinedColumns = useMemo(() => [...FEATURE_COLUMNS, ...(columns ?? [])], [columns])

  return (
    <Table
      className={cn(css.FeatureTable, className)}
      columns={combinedColumns}
      actions={[
        <Button start='edit' content='Edit' />,
        <Button start='delete_forever' content='Delete' />,
      ]}
      pagination
      {...otherProps}
    >
      {children}
    </Table>
  )
}

FeatureTable.displayName = 'FeatureTable'

export default FeatureTable
