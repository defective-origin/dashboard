import React from 'react'
import MuiTableBody from '@mui/material/TableBody'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './TableBody.module.scss'
import { TableColumn, TableKeygen, TableRecord } from '../Table.types'
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
export function TableBody<T extends TableRecord>(props: TableBodyProps<T>) {
  const { items, columns, keygen = DEFAULT_KEYGEN, className, ...otherProps } = props
  const _className = cn(css.TableBody, className)

  return (
    <MuiTableBody className={_className} {...otherProps}>
      {items?.map((item, idx) =>
        <TableRow key={keygen(item, idx)} id={keygen(item, idx)} columns={columns} item={item} />,
      )}
    </MuiTableBody>
  )
}

TableBody.displayName = 'TableBody'

export default TableBody
