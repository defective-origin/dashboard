import React from 'react'
import MuiTableRow from '@mui/material/TableRow'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './TableRow.module.scss'
import { TableColumn, TableRecord } from '../Table.type'
import TableCell, { CellSort } from '../TableCell'

export type TableRowProps<T extends TableRecord> = {
  th?: boolean
  item?: T
  columns?: TableColumn<T>[]
  className?: string
  onSort?: CellSort<T>
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <TableRow />
 */
export const TableRow = React.memo(<T extends TableRecord>(props: TableRowProps<T>): JSX.Element => {
  const { item, th = !item, columns, onSort, className, ...otherProps } = props
  const _className = cn(css.TableRow, { [css.Hover]: !th }, className)

  return (
    <MuiTableRow className={_className} tabIndex={-1} {...otherProps}>
      {columns?.map((column) => (
        <TableCell
          key={column.key}
          th={th}
          item={item}
          column={column}
          zIndex={column.fixed ? columns.length : undefined}
          onSort={onSort}
        />
      ))}
    </MuiTableRow>
  )
}) as <T extends TableRecord>(props: TableRowProps<T>) => JSX.Element

export default TableRow
