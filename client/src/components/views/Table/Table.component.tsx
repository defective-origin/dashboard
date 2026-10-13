import React, { useMemo, useState } from 'react'
import MuiTable from '@mui/material/Table'
import MuiTableContainer from '@mui/material/TableContainer'

// ---| core |---
import { arr, cn, obj } from 'tools'

// ---| components |---
import Text from 'components/views/Text'
import Block, { BlockProps } from 'components/layouts/Block'
import Scroll from 'components/layouts/Scroll'
import Banner from 'components/views/Banner'
import Actions from 'components/layouts/Actions'

// ---| self |---
import css from './Table.module.scss'
import TableHead from './TableHead'
import TableBody from './TableBody'
import TablePagination, { DEFAULT_PAGINATION_OPTIONS } from './TablePagination'
import { TableColumn, TableFilter, TableKeygen, TableOrder, TableRecord, TableSort } from './Table.types'
import TableRowMenu from './TableRowMenu'


const ORDER_NEXT_MAP: Record<TableOrder | 'undefined', TableOrder | undefined> = {
  undefined: 'asc',
  asc: 'desc',
  desc: undefined,
}

export type TableProps<T extends TableRecord> = BlockProps & {
  title?: React.ReactNode
  items?: T[]
  columns?: TableColumn<T>[]
  filters?: TableFilter<T>[]
  pagination?: boolean
  loading?: boolean
  actions?: React.ReactNode
  menu?: React.ReactNode
  keygen?: TableKeygen<T>
}

/**
 * Component description.
 * @example
 * <Table />
 */
export function Table<T extends TableRecord>(props: TableProps<T>) {
  const {
    menu, title, actions, width = '100%', height = '100%', minHeight, loading, items,
    columns, filters, pagination, keygen, children, className, ...otherProps
  } = props
  const [paginator, setPaginator] = React.useState(DEFAULT_PAGINATION_OPTIONS)
  const [sortColumn, setSortColumn] = useState<TableColumn<T>>()
  const defaultColumns: TableColumn<T>[] = useMemo(() => { // TODO: add payload for column config?
    // add actions
    if (actions && !columns?.find(c => c.key === 'actions')) {
      columns?.push({
        key: 'actions',
        align: 'center',
        width: 33,
        fixed: true,
        cell: TableRowMenu,
        props: { padding: 0 },
        mapper: (record, column) => ({ children: actions, record, column }),
      })
    }
    // TODO: calculate all settings in columns function
    // setup left and right position for fixed columns
    const fixedColumns = columns?.filter(column => column.fixed) ?? []

    for (let i = 0, left = 0, right = 0; i < fixedColumns.length; i++) {
      const leftColumn = fixedColumns[i]
      const rightColumn = fixedColumns[fixedColumns.length - i - 1]

      // apply fixed width size
      leftColumn.width = leftColumn.width ?? leftColumn.minWidth
      leftColumn.minWidth = leftColumn.minWidth ?? leftColumn.width
      rightColumn.width = rightColumn.width ?? rightColumn.minWidth
      rightColumn.minWidth = rightColumn.minWidth ?? rightColumn.width

      // add column shifts
      leftColumn.left = left
      rightColumn.right = right

      // add indent for next columns
      left += leftColumn.width ?? 0
      right += rightColumn.width ?? 0

      // fixed column cannot be set without size
      if (!leftColumn.width || !rightColumn.width) {
        const columnWithoutSize = leftColumn.width ? leftColumn : rightColumn

        console.error(`Fixed column should have width or minWidth property: ${JSON.stringify(columnWithoutSize)}`)
      }
    }

    columns?.forEach((column, idx) => {
      // setup key
      column.key = column.key ?? column.field ?? idx

      // setup name by field name by default
      column.name = column.name ?? (column.field as string)?.split('.').at(-1)

      // setup alignment
      column.alignCell = column.alignCell ?? column.align

      // setup sort function
      column.sortBy = column.sort ? column.sortBy ?? column.field : undefined
      if (typeof column.sort === 'boolean') {
        if (!column.sortBy) {
          console.error(`If column has column.sort: true then column.field or column.sortBy should be set. Column: ${JSON.stringify(column)}`)
          column.sort = undefined
        } else {
          column.sort = (_, __, field) => field
        }
      }

      // setup render function
      if (!column.render && column.cell && column.mapper) {
        column.render = (item, column, field) => {
          const Cell = column.cell as React.FC
          const cellProps = column.mapper?.(item, column, field)

          return <Cell {...column.props} {...cellProps} />
        }
      } else if (!column.render && column.field) {
        column.render = (_, __, field) => field
      }
    })

    return columns?.map(column => ({ ...column })) ?? []
  }, [actions, columns])

  const visibleColumns = useMemo(() => {
    return defaultColumns.map(c => {
      if (sortColumn && sortColumn.key === c.key) {
        return { ...c, order: ORDER_NEXT_MAP[sortColumn.order as TableOrder] }
      } else if (c.order) {
        return { ...c, order: undefined }
      }

      return c
    })
  }, [defaultColumns, sortColumn])

  const visibleItems = useMemo(() => {
    // filter items
    let result = filters?.length
      ? items?.filter(item => filters?.every(filter => filter(item))) ?? []
      : items ?? []

    if (sortColumn) {
      const order = ORDER_NEXT_MAP[sortColumn.order as TableOrder]
      const selector = (item: T) => (sortColumn.sort as TableSort<T>)(item, sortColumn, obj.get(item, sortColumn.sortBy))

      result = order ? arr.sort(items, order, selector) ?? [] : result
    }

    if (pagination) {
      const start = paginator.page * paginator.rows
      const end = start + paginator.rows

      result = result.slice(start, end)
    }

    return result
  }, [filters, items, sortColumn, pagination, paginator.page, paginator.rows])

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
    <Block className={cn(css.Table, className)} style={{ width, height, minHeight }} {...otherProps}>
      <Block className={css.TableHeader} v='x' justifies='space-between' aligns='center'>
        <Text v='h4'>{title}</Text>
        <TablePagination visible={!!pagination} records={items?.length} onChange={setPaginator} {...paginator} />
        <Actions g='xxs' size='sm' justifies='end'>{menu}</Actions>
      </Block>

      <MuiTableContainer className={css.TableContainer} sx={{ height: '100%', width: '100%' }}>
        <MuiTable stickyHeader aria-label='sticky table'>
          <TableHead columns={visibleColumns} onSort={setSortColumn} />
          <TableBody columns={visibleColumns} items={visibleItems} keygen={keygen} />

          {children}
        </MuiTable>

        <Scroll key={visibleItems?.length} v='xy' top={33} thin>
          <Banner image='empty' loading={loading} visible={!visibleItems.length} absolute />
        </Scroll>
      </MuiTableContainer>
    </Block>
  )
}

Table.displayName = 'Table'

export default Table
