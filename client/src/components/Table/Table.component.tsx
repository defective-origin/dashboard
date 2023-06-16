import React from 'react'

// ---| components |---
import { Table as AntdTable, TableProps as AntdTableProps } from 'antd'
import Text, { TextProps } from 'components/Text'
import Pagination from 'components/Pagination'
import Box, { BoxProps } from 'components/Box'

// ---| common |---
import { cn } from 'common/tools'
import { useToggler } from 'common/hooks'

// ---| self |---
import css from './Table.module.scss'
import TableMenu, { TableMenuProps } from './TableMenu'
import TablePanel, { TablePanelProps } from './TablePanel'

export type TableProps = BoxProps & TableMenuProps & {
  title?: React.ReactNode
  titleOptions?: TextProps
  options?: { columns: any, filters: any, idSelector: any }
  items?: []
  preview?: TablePanelProps
  change?: TablePanelProps
  onChange?: () => void
  create?: TablePanelProps
  onCreate?: () => void
  onExport?: () => void
  onRefresh?: () => void
  onSearch?: () => void
  paginator?: boolean
  menu?: boolean
}

// sticky header footer  column
// ellipses
// functionality:
//    - Row Actions
//        - [Preview] - schema or ReactNode
//        - [Change] - schema or ReactNode
//        - [Create] - schema or ReactNode
//    - Column Actions
//        - [Order]
//        - [TURN on/off] - [eye]
//    - Table Actions
//        - [Export/Download]
//        - [Refresh]
//        - [Search]
//        - [Page/Total/Row count]
//        - [Sort]
//        - [Filters] - by  types/selectors/text  -  reset
//        - [Save/Reset settings]

// FIXME: соединить sort и view column + filters [restore order, restore colums view, restore filters, restore all]
// TODO: highlight if anything changed in icon setting
// TODO: column settings: reorder, turn on/off, sort
// TODO: page size as selector 10 20 50 100 records
// TODO: all settings open via drawer

// FIXME: мэрджин  на  скролл  как  в  телеге
// FIXME: скопировать стили  таблицы. Посмотреть  как  антд  таблицу с  левым и правым  выделением  делают

// https://ant.design/components/table/#components-table-demo-row-selection-custom
// https://ant.design/components/pagination/
// https://ant.design/components/drawer/
// https://ant.design/components/popover/
export default function Table(props: TableProps): JSX.Element | null {
  const { total, page, pageSize, titleOptions, className, ...otherProps } = props
  const descriptionToggler = useToggler()

  // TODO: filter_list search download upload refresh view_column more_vert
  // TODO: add title for each icon
  // TODO: check  antd table  and  paginator
  // FIXME: add refresh button under pagination
  return (
    <Box className={cn(css.TableContainer, className)} {...otherProps}>
      <Text.H3 text="title" {...titleOptions} />
      <TableMenu total={total} page={page} pageSize={pageSize} />

      <div className={css.TableWrapper}>
        <AntdTable pagination={false} className={css.Table} size='small' />
        <Pagination type='vertical' total={total} records={pageSize} showSizeChanger={false} onChange={() => {}} />
        <TablePanel />
      </div>
    </Box>
  )
}
