import React from 'react'
import MuiTableBody from '@mui/material/TableBody'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './TableBody.module.scss'
import { TableColumn, TableKeygen, TableRecord } from '../Table.type'
import TableRow from '../TableRow'

const DEFAULT_KEYGEN: TableKeygen<TableRecord> = (item, index) => (item?.id ?? item?.key ?? index) as number

export type TableBodyProps<T extends TableRecord> = {
  items?: T[]
  columns?: TableColumn<T>[]
  className?: string
  keygen?: TableKeygen<T>
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <TableBody />
 */
export function TableBody<T extends TableRecord>(props: TableBodyProps<T>): JSX.Element {
  const { items, columns, keygen = DEFAULT_KEYGEN, className, ...otherProps } = props
  const _className = cn(css.TableBody, className)

  return (
    <MuiTableBody className={_className} {...otherProps}>
      {items?.map((item, idx) =>
        <TableRow columns={columns} item={item} key={keygen(item, idx)} />,
      )}
    </MuiTableBody>
  )
}

TableBody.displayName = 'TableBody'

export default TableBody
