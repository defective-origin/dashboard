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
import Actions, { ActionItem } from 'components/actions/Actions'

// ---| self |---
import css from './Table.module.scss'
import TableHead from './TableHead'
import TableBody from './TableBody'
import { useTableManager } from './Table.hooks'
import TablePagination from './TablePagination'
import { TableColumn, TableFilter, TableKeygen, TableRecord } from './Table.types'
import { TableRowMenuItem } from './TableRowMenu'

export type TableProps<T extends TableRecord> = BlockProps & {
  title?: React.ReactNode
  items?: T[]
  columns?: TableColumn<T>[]
  filters?: TableFilter<T>[]
  pagination?: boolean
  loading?: boolean
  actions?: TableRowMenuItem[]
  menu?: ActionItem[]
  keygen?: TableKeygen<T>
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Table />
 */
export function Table<T extends TableRecord>(props: TableProps<T>) {
  const {
    menu, title, actions, width = '100%', height = '100%', minHeight, loading, items,
    columns, filters, pagination, keygen, children, className, ...otherProps
  } = props
  const _className = cn(css.Table, className)
  const [pageItems, setItems] = React.useState<T[]>()
  const manager = useTableManager({ items, columns, filters, actions })

  // TODO: save presets in local storage
  // TODO: create filters component Filter.Container, Filter.Number, Filter.Range ...
  // TODO: table header make sticky when we scroll global scroll
  // TODO: fix deep typescript recursion freeze
  // TODO: add actions: view/edit (on line click), remove, add action under table
  // TODO: add sort by html cell content
  // TODO: add Reset button to last column: reset sorting and filters and other column settings
  // TODO: fix all columns if there is no scroll!
  // TODO: add search, filters, hide/show columns, info drawer[pass component for body]
  return (
    <Block className={_className} style={{ width, height, minHeight }} {...otherProps}>
      <Block className={css.TableHeader} v='x' justifies='space-between' aligns='center'>
        <Text>{title}</Text>
        <TablePagination visible={!!pagination} items={items} onChange={setItems} />
        <Actions items={menu} g='xxs' size='sm' justifies='end' />
      </Block>

      <MuiTableContainer className={css.TableContainer} sx={{ height: '100%', width: '100%' }}>
        <MuiTable stickyHeader aria-label='sticky table'>
          <TableHead columns={manager.columns} onSort={manager.sort} />
          <TableBody columns={manager.columns} items={pageItems} keygen={keygen} />

          {children}
        </MuiTable>

        <Scroll key={pageItems?.length} v='xy' size='sm' top={33}>
          <Banner
            image='empty'
            loading={loading}
            visible={!manager.items.length}
            absolute
          />
        </Scroll>
      </MuiTableContainer>
    </Block>
  )
}

Table.displayName = 'Table'

export default Table
