import React from 'react'
import MuiTableHead from '@mui/material/TableHead'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './TableHead.module.scss'
import { TableColumn, TableRecord } from '../Table.type'
import TableRow from '../TableRow'

export type TableHeadProps<T extends TableRecord> = {
  columns?: TableColumn<T>[]
  className?: string
  onSort?: (column: TableColumn<T>) => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <TableHead />
 */
export function TableHead<T extends TableRecord>(props: TableHeadProps<T>): JSX.Element {
  const { onSort, columns, className, ...otherProps } = props
  const _className = cn(css.TableHead, className)
  const style: React.CSSProperties = {
    zIndex: (columns?.length ?? 0) + 1,
  }

  return (
    <MuiTableHead className={_className} style={style} {...otherProps}>
      <TableRow columns={columns} onSort={onSort} th />
    </MuiTableHead>
  )
}

TableHead.displayName = 'TableHead'

export default TableHead
