import React from 'react'
import MuiTable from '@mui/material/Table'
import MuiTableContainer from '@mui/material/TableContainer'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Block, { BlockProps } from 'components/layouts/Block'
import Scroll from 'components/layouts/Scroll'
import Banner from 'components/views/Banner'

// ---| self |---
import css from './Table.module.scss'
import TableHead from './TableHead'
import TableBody from './TableBody'
import { useTableManager } from './Table.hook'
import TablePagination, { TablePaginationProps } from './TablePagination'
import { TableColumn, TableFilter, TableKeygen, TableRecord } from './Table.type'
import { TableRowMenuItem } from './TableRowMenu'

export type TableProps<T extends TableRecord> = BlockProps & {
  title?: React.ReactNode
  items?: T[]
  columns?: TableColumn<T>[]
  filters?: TableFilter<T>[]
  pagination?: boolean | TablePaginationProps
  loading?: boolean
  actions?: TableRowMenuItem[]
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
  const { title, actions, width = '100%', height = '100%', minHeight, loading, items, columns, filters, pagination, keygen, children, className, ...otherProps } = props
  const _className = cn(css.Table, className)
  const manager = useTableManager({ items, columns, filters, pagination, actions })

  // TODO: add sort by html cell content
  // TODO: add Reset button to last column: reset sorting and filters and other column settings
  // TODO: fix all columns if there is no scroll!
  return (
    <Block className={_className} style={{ width, height, minHeight }} {...otherProps}>
      <Block v='x' justifies='space-between' aligns='center'>
        <Text>{title}</Text>
        <TablePagination show={!!pagination} {...manager.pagination} />
      </Block>

      <MuiTableContainer className={css.TableContainer} sx={{ height: '100%', width: '100%' }}>
        <MuiTable stickyHeader aria-label='sticky table'>
          <TableHead columns={manager.columns} onSort={manager.sort} />
          <TableBody columns={manager.columns} items={manager.pageItems} keygen={keygen} />

          {children}
        </MuiTable>

        <Scroll key={manager.pageItems.length} v='xy' size='sm' top={33}>
          <Banner
            v='empty'
            loading={loading}
            show={!manager.items.length}
            absolute
          />
        </Scroll>
      </MuiTableContainer>
    </Block>
  )
}

Table.displayName = 'Table'

export default Table
