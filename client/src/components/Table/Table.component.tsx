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
import { TableRowMenuItem } from './TableRowMenu'

export type TableProps<T extends TableRecord> = {
  items?: T[]
  width?: number | string
  height?: number | string
  minHeight?: number | string
  columns?: TableColumn<T>[]
  filters?: TableFilter<T>[]
  pagination?: boolean | TablePaginationProps
  loading?: boolean
  actions?: TableRowMenuItem[]
  className?: string
  children?: React.ReactNode
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
  const { actions, width = '100%', height = '100%', minHeight, loading, items, columns, filters, pagination, keygen, children, className, ...otherProps } = props
  const _className = cn(css.Table, className)
  const manager = useTableManager({ items, columns, filters, pagination, actions })

  // TODO: add Reset button to last column: reset sorting and filters and other column settings
  return (
    <div className={_className} style={{ width, height, minHeight }} {...otherProps}>
      <TablePagination show={!!pagination} {...manager.pagination} />

      <MuiTableContainer className={css.TableContainer} sx={{ height: '100%', width: '100%' }}>
        <MuiTable stickyHeader aria-label='sticky table'>
          <TableHead columns={manager.columns} onSort={manager.sort} />
          <TableBody columns={manager.columns} items={manager.pageItems} keygen={keygen} />

          {children}
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
    </div>
  )
}

Table.displayName = 'Table'

export default Table
