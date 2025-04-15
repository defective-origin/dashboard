// ---| components |---
import Text, { TextProps } from 'components/views/Text'
import Icon, { IconProps } from 'components/views/Icon'

// ---| self |---
import { TableColumn, TableRecord } from './Table.types'

export type TextColumnOptions = Pick<TextProps, 'format' | 'placeholder' | 'color' | 'ellipsis' | 'bold' | 'nowrap'>
export type TextColumn<T extends TableRecord,> = TableColumn<T, TextProps> & TextColumnOptions

export const textColumn = <T extends TableRecord>(column: TextColumn<T>): TextColumn<T> => ({
  sort: true,
  cell: Text,
  mapper: (_, __, field) => ({ content: field }),
  ...column,
  props: {
    v: 'caption',
    size: 'xxs',
    format: column.format,
    placeholder: column.placeholder,
    color: column.color,
    ellipsis: column.ellipsis,
    bold: column.bold,
    nowrap: column.nowrap,
    ...column.props,
  },
})

export const numberColumn = <T extends TableRecord>(column: TextColumn<T>) => textColumn({
  minWidth: 130,
  align: 'right',
  format: 'number',
  ...column,
})

export const dateColumn = <T extends TableRecord>(column: TextColumn<T>) => textColumn({
  minWidth: 200,
  align: 'center',
  format: 'day-of-month-year',
  sort: (_, __, field) => new Date(field),
  ...column,
})


export type IconColumnOptions = IconProps
export type IconColumn<T extends TableRecord,> = TableColumn<T, IconColumnOptions> & IconColumnOptions

export const iconColumn = <T extends TableRecord>(column: IconColumn<T>): IconColumn<T> => ({
  cell: Icon,
  align: 'center',
  ...column,
  props: {
    v: column.v,
    fill: column.fill,
    style: { verticalAlign: 'middle', ...column.style } ,
    color: column.color,
    size: column.size ?? 'sm',
    className: column.className,
    ...column.props,
  },
})


export const booleanColumn = <T extends TableRecord>(column: IconColumn<T>): IconColumn<T> => iconColumn({
  ...column,
  mapper: (_, __, field) => {
    if (field === undefined) {
      return
    } else if (field) {
      return { v: 'check', color: 'success' }
    }

    return { v: 'close', color: 'error' }
  },
})

// TODO: add condition, user, group, tag, yes-no and other columns

export default {
  text: textColumn,
  number: numberColumn,
  date: dateColumn,
  icon: iconColumn,
  boolean: booleanColumn,
}
