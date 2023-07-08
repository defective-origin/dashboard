import React from 'react'
import MuiTable, { TableProps as MuiTableProps } from '@mui/material/Table'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Table.module.scss'

export type TableProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Table />
 */
export function Table(props: TableProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Table, className)

  return <div className={_className} {...otherProps}>{children}</div>
}

Table.displayName = 'Table'

export default Table
