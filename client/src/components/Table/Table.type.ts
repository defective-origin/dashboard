/* eslint-disable @typescript-eslint/no-explicit-any */
import { arr, react } from 'tools'

export type TableColumnAlign = 'left' | 'center' | 'right'
export type TableOrder = arr.SortOrder
export type TableRecordKey = string | number
export type TableRecord = Record<TableRecordKey, unknown>
export type TableFilter<T extends TableRecord> = (item: T) => boolean
export type TableKeygen<T extends TableRecord> = (item: T, index: number) => React.Key
export type TableSort<T extends TableRecord, P extends object = object> = (item: T, column: TableColumn<T, P>, field: any) => arr.SortType
export type TableMapper<T extends TableRecord, P extends object = object> = (item: T, column: TableColumn<T, P>, field: any) => Partial<P>
export type TableRender<T extends TableRecord, P extends object = object> = (item: T, column: TableColumn<T, P>, field: any) => React.ReactNode

export type TableColumn<T extends TableRecord, P extends object = object> = {
  /** By default `record.id`, `record.key`. If Id is not set then Index by default */
  key?: React.Key
  /** Column Name */
  name?: React.ReactNode

  // ordering and alignment params
  /** Default sort ordering `asc`, `desc` */
  order?: TableOrder
  /** Sort field. Sort by column.field by default */
  sortBy?: react.FlattenObjectKeys<T>
  /** Sort column by `asc`, `desc` */
  sort?: boolean | TableSort<T, P>
  /** Align content horizontally */
  align?: TableColumnAlign
  /** Align cell content horizontally. By default `align` used */
  alignCell?: TableColumnAlign

  // fixation params
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

  // render params
  /** Path to value from record */
  field?: react.FlattenObjectKeys<T>
  /** Custom cell content render component */
  cell?: React.FunctionComponent<P>
  // TODO: add editCell
  // TODO: condition cell
  /** Extra static props for component */
  props?: Partial<P>
  /** Map record data to component props */
  mapper?: TableMapper<T, P>
  /** Custom cell render */
  render?: TableRender<T, P>
}
