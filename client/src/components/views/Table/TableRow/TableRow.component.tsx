import React from 'react'
import MuiTableRow from '@mui/material/TableRow'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './TableRow.module.scss'
import { TableColumn, TableRecord } from '../Table.types'
import TableCell, { CellSort } from '../TableCell'

export type TableRowProps<T extends TableRecord> = {
  id?: string | number | bigint
  th?: boolean
  item?: T
  columns?: TableColumn<T>[]
  className?: string
  onSort?: CellSort<T>
}

/**
 * Component description.
 * @example
 * <TableRow />
 */
export const TableRow = React.memo(<T extends TableRecord>(props: TableRowProps<T>) => {
  const { id = 'head', item, th = !item, columns, onSort, className, ...otherProps } = props

  return (
    <MuiTableRow
      id={id as string}
      className={cn(css.TableRow, { [css.Hover]: !th }, className)}
      tabIndex={-1}
      {...otherProps}
    >
      {columns?.map(column => (
        <TableCell
          id={`${id}-${column.key}`}
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
})

export default TableRow
