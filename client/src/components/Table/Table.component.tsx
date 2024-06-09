import React from 'react'
import MuiTable from '@mui/material/Table'
import MuiTableContainer from '@mui/material/TableContainer'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Scroll from 'components/Scroll'
import Banner from 'components/Banner'

// ---| self |---
import css from './Table.module.scss'
import TableHead from './TableHead'
import TableBody from './TableBody'
import { useTableManager } from './Table.hook'
import TablePagination, { TablePaginationProps } from './TablePagination'
import { TableColumn, TableFilter, TableKeygen, TableRecord } from './Table.type'

export type TableProps<T extends TableRecord> = {
  items?: T[]
  width?: number | string
  height?: number | string
  columns?: TableColumn<T>[]
  filters?: TableFilter<T>[]
  pagination?: boolean | TablePaginationProps
  loading?: boolean
  className?: string
  keygen?: TableKeygen<T>
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Table />
 */
export function Table<T extends TableRecord>(props: TableProps<T>): JSX.Element {
  const { width = '100%', height = '100%', loading, items, columns, filters, pagination, keygen, className, ...otherProps } = props
  const _className = cn(css.Table, className)
  const manager = useTableManager({ items, columns, filters, pagination })

  // TODO: add Reset button to last column: reset sorting and filters and other column settings
  return (
    <div style={{ width, height }} className={_className} {...otherProps}>
      <MuiTableContainer sx={{ height: 'inherit', width: 'inherit' }}>
        <MuiTable stickyHeader aria-label='sticky table'>
          <TableHead columns={manager.columns} onSort={manager.sort} />
          <TableBody columns={manager.columns} items={manager.pageItems} keygen={keygen} />
        </MuiTable>

        <Scroll key={manager.pageItems.length} v='xy' size='sm' top={60}>
          <Banner
            v='empty'
            loading={loading}
            show={!manager.items.length}
            absolute
          />
        </Scroll>
      </MuiTableContainer>

      <TablePagination show={!!pagination} {...manager.pagination} />
    </div>
  )
}

Table.displayName = 'Table'

export default Table
