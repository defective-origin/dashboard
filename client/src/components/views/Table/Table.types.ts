/* eslint-disable @typescript-eslint/no-explicit-any */
import { arr, react } from 'tools'

export type TableColumnAlign = 'left' | 'center' | 'right'
export type TableOrder = arr.SortOrder
export type TableRecordKey = string | number
export type TableRecord = Record<TableRecordKey, unknown>
export type TableFilter<T extends TableRecord> = (item: T) => boolean
export type TableKeygen<T extends TableRecord> = (item: T, index: number) => React.Key
export type TableSort<T extends TableRecord, P extends object = object> = (item: T, column: TableColumn<T, P>, field: any) => arr.SortType
export type TableMapper<T extends TableRecord, P extends object = object> = (item: T, column: TableColumn<T, P>, field: any) => Partial<P> | undefined
export type TableRender<T extends TableRecord, P extends object = object> = (item: T, column: TableColumn<T, P>, field: any) => React.ReactNode

export type TableColumnHeader = {
  /** By default `record.id`, `record.key`. If Id is not set then Index by default */
  key?: React.Key
  /** Column Name */
  name?: React.ReactNode
}

export type TableColumnCellView<T extends TableRecord, P extends object = object> = {
  /** Align content horizontally */
  align?: TableColumnAlign
  /** Align cell content horizontally. By default `align` used */
  alignCell?: TableColumnAlign
  /** Path to value from record */
  field?: react.FlattenObjectKeys<T> // TODO: remove field and not take value by this field. add key to set uniq id
  /** Custom cell content render component */
  cell?: React.FunctionComponent<P>
  // TODO: add editCell
  // TODO: condition cell
  /** Extra static props for component */
  props?: Partial<P> // TODO: remove and leave only mapper()?
  /** Map record data to component props */
  mapper?: TableMapper<T, P>
  /** Custom cell render */
  render?: TableRender<T, P>
}

export type TableColumnCellEdit<T extends TableRecord, P extends object = object> = {}

export type TableColumnSorting<T extends TableRecord, P extends object = object> = {
  /** Default sort ordering `asc`, `desc` */
  order?: TableOrder
  /** Sort field. Sort by column.field by default */
  sortBy?: react.FlattenObjectKeys<T>
  /** Sort column by `asc`, `desc` */
  sort?: boolean | TableSort<T, P>
}

export type TableColumnFilter<T extends TableRecord, P extends object = object> = {}

export type TableColumnDisplay = {
  /** disable actions for column in column menu. Bu default true */
  customizable?: boolean;
  /** hide column in table by default. Can be changed in column menu */
  hidden?: boolean;
  /** initial column position. Can be changed in column menu */
  position?: number;
  /** Set cell width. It's copied from minWidth if `fixed` is set */
  width?: number
  /** Set min cell width */
  minWidth?: number
  /** Fix column on scroll to `right` and `left` side */
  fixed?: boolean
  /** Left indent for fixed column. It calculates automatically */
  left?: number
  /** Right indent for fixed column. It calculates automatically */
  right?: number
};

// TODO: init static and default props via columns([]), group() function. not inside component
// TODO: add column props and table components: filters (filter?: boolean | (item, field) => boolean), search
// TODO: add payload to table to spread for all configs instead of functions wrappers
// TODO: fix Type instantiation is excessively deep and possibly infinite
export type TableColumn<T extends TableRecord, P extends object = object> =
  TableColumnHeader &
  TableColumnDisplay &
  TableColumnSorting<T, P> &
  TableColumnFilter<T, P> &
  TableColumnCellView<T, P> &
  TableColumnCellEdit<T, P>
