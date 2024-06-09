import React from 'react'
import MuiTablePagination from '@mui/material/TablePagination'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './TablePagination.module.scss'
import { TablePaginationReturnOptions } from './TablePagination.hook'

export type TablePaginationProps = TablePaginationReturnOptions & {
  show?: boolean
  className?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <TablePagination />
 */
export function TablePagination(props: TablePaginationProps): JSX.Element | null {
  const { show, className, ...otherProps } = props
  const _className = cn(css.TablePagination, className)

  if (!show) {
    return null
  }

  return (
    <MuiTablePagination
      className={_className}
      component='div'
      showFirstButton
      showLastButton
      {...otherProps}
    />
  )
}

TablePagination.displayName = 'TablePagination'

export default TablePagination
