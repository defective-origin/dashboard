import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

// ---| core |---
import { obj, arr } from 'tools'

// ---| self |---
import { TableColumn, TableFilter, TableOrder, TableRecord, TableSort } from './Table.types'
import TableRowMenu, { TableRowMenuItem } from './TableRowMenu'

const ORDER_NEXT_MAP: Record<TableOrder | 'undefined', TableOrder | undefined> = {
  undefined: 'asc',
  asc: 'desc',
  desc: undefined,
}

export type TableManagerOptions<T extends TableRecord> = {
  items?: T[]
  columns?: TableColumn<T>[]
  filters?: TableFilter<T>[]
  actions?: TableRowMenuItem[]
}

export const useTableManager = <T extends TableRecord>(options: TableManagerOptions<T>) => {
  const preparedItems = useRef<T[]>([])
  const [items, setItems] = useState<T[]>([])
  const [columns, setColumns] = useState<TableColumn<T>[]>([])

  // setup columns
  useLayoutEffect(() => {
    // add actions
    if (options.actions && !options.columns?.find(c => c.key === 'actions')) {
      options.columns?.push({
        key: 'actions',
        align: 'center',
        width: 33,
        fixed: true,
        cell: TableRowMenu,
        props: { padding: 0 },
        mapper: (record, column) => ({ items: options.actions, record, column }),
      })
    }

    // setup left and right position for fixed columns
    const fixedColumns = options.columns?.filter(column => column.fixed) ?? []

    for (let i = 0, left = 0, right = 0; i < fixedColumns.length; i++) {
      const leftColumn = fixedColumns[i]
      const rightColumn = fixedColumns[fixedColumns.length - i - 1]

      // TODO: move to columns() function in order to static initialization
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

    options.columns?.forEach((column, idx) => {
      // setup key
      column.key = column.key ?? column.field ?? idx

      // setup name by field name by default
      column.name = column.name ?? column.field?.split('.').at(-1)

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

    setColumns(options.columns?.map(column => ({ ...column })) ?? [])
  }, [options.actions, options.columns])


  // setup items
  useEffect(() => {
    // filter items
    preparedItems.current = options.filters?.length
      ? options.items?.filter(item => options.filters?.every(filter => filter(item))) ?? []
      : options.items ?? []

    setItems(preparedItems.current)
  }, [options.filters, options.items])


  const sort = useCallback((column: TableColumn<T>) => {
    const order = ORDER_NEXT_MAP[column.order as TableOrder]
    const selector = (item: T) => (column.sort as TableSort<T>)(item, column, obj.get(item, column.sortBy))
    const sortedItems = order
      ? arr.sort(preparedItems.current, order, selector)
      : preparedItems.current

    setItems(sortedItems)
    setColumns(columns => columns.map(c => {
      if (column.key === c.key) {
        return { ...c, order }
      } else if (c.order) {
        return { ...c, order: undefined }
      }

      return c
    }))
  }, [])

  return { columns, items, sort }
}
