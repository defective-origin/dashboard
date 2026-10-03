import React from 'react'
import MuiTableHead from '@mui/material/TableHead'

// ---| core |---
import { cn } from 'tools'

// ---| components |---

// ---| self |---
import css from './TableHead.module.scss'
import { TableColumn, TableRecord } from '../Table.types'
import TableRow from '../TableRow'

export type TableHeadProps<T extends TableRecord> = {
  columns?: TableColumn<T>[]
  className?: string
  onSort?: (column: TableColumn<T>) => void
}

/**
 * Component description.
 * @example
 * <TableHead />
 */
export function TableHead<T extends TableRecord>(props: TableHeadProps<T>) {
  const { onSort, columns, className, ...otherProps } = props
  const style: React.CSSProperties = {
    zIndex: (columns?.length ?? 0) + 1,
  }

  return (
    <MuiTableHead className={cn(css.TableHead, className)} style={style} {...otherProps}>
      <TableRow columns={columns} onSort={onSort} th />
    </MuiTableHead>
  )
}

TableHead.displayName = 'TableHead'

export default TableHead
