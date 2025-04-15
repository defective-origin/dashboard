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



// TODO:
// export type TableColumnMenu = {
//   /** column name in table menu */
//   labelInMenu?: string;
//   /** disable actions for column in configuration column menu */
//   disableInMenu?: boolean;
//   /** hide column in column menu */
//   hideInMenu?: boolean;
//   /** hide column in table by default. Can be changed in configuration column menu */
//   hidden?: boolean;
//   /** initial column position */
//   initPosition?: Key;
// };

// export type TableColumnMeta<T> = {
//   /** record property list which is used to render column */
//   fields?: T extends {} ? (keyof T)[] : undefined;
// };


// presets: {
//     view: 'v2',
//     expendRows: true,
//     columns: [
//         { key: "field1", hidden: false, filter: { from: to: }, sort: "asc" }, 
//         { key: "field2", hidden: true, children: [
//           { key: "subfield1", hidden: true },
//           { key: "subfield2", hidden: false }
//         ]},
//     ]
// }

// 1) ["field1", "field2", "subfield1", "subfield2"]
// 2) ["-field1", "field2", "subfield1", "-subfield2"]
// 3) [
//  { key: "field1", isVisible: false },
//  {
//   key: "field2",
//   isVisible: true,
//   children: [
//    { key: "subfield1", isVisible: true },
//    { key: "subfield2", isVisible: false }
//   ]
//  }
// ]
// 4) [
//  { key: "field1", isVisible: false }, 
//  { key: "field2", isVisible: true }, 
//  { key: "subfield1", isVisible: true },
//  { key: "subfield2", isVisible: false, sort: "asc", filters: { from:, to: } },
// ]


// TODO: init static and default props via columns([]), group() function. not inside component
// TODO: add column props and table components: filters (filter?: boolean | (item, field) => boolean), search
// TODO: add payload to table to spread for all configs instead of functions wrappers
// TODO: fix Type instantiation is excessively deep and possibly infinite
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
  props?: Partial<P> // TODO: remove and leave only mapper()?
  /** Map record data to component props */
  mapper?: TableMapper<T, P>
  /** Custom cell render */
  render?: TableRender<T, P>
}
