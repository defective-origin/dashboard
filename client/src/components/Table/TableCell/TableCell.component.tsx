import React from 'react'
import MuiTableCell from '@mui/material/TableCell'
import MuiTableSortLabel from '@mui/material/TableSortLabel'

// ---| core |---
import { cn, get } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'

// ---| self |---
import css from './TableCell.module.scss'
import { TableColumn, TableRecord } from '../Table.type'

export type CellSort<T extends TableRecord> = (column: TableColumn<T>) => void

export type TableCellProps<T extends TableRecord> = {
  th?: boolean
  item?: T
  column: TableColumn<T>
  zIndex?: number
  className?: string
  onSort?: CellSort<T>
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <TableCell />
 */
export function TableCell<T extends TableRecord>(props: TableCellProps<T>): JSX.Element {
  const { th, item, column, zIndex, onSort, className, ...otherProps } = props
  const _className = cn(css.TableCell, { [css.Fixed]: column.fixed }, className)
  const style: React.CSSProperties = {
    zIndex: zIndex,
    left: column.left,
    right: column.right,
    width: column.width,
    minWidth: column.minWidth,
  }

  // separated for performance reason
  if (th) {
    return (
      <MuiTableCell className={_className} align={column.align} style={style} {...otherProps}>
        {!column.sort && <Text v='caption' size='xxs' content={column.name} bold />}

        {column.sort && (
          <MuiTableSortLabel
            active={!!column.order}
            direction={column.order}
            onClick={() => onSort?.(column)}
          >
            <Text v='caption' size='xxs' content={column.name} bold />
          </MuiTableSortLabel>
        )}
      </MuiTableCell>
    )
  }

  const field = column.field && get(item as T, column.field)

  return (
    <MuiTableCell className={_className} align={column.alignCell} style={style} {...otherProps}>
      {item && column.render?.(item, column, field)}
    </MuiTableCell>
  )
}

TableCell.displayName = 'TableCell'

export default TableCell
