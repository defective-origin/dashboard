import defaultColumns, { TextColumn, textColumn } from 'components/views/Table/Table.tools'
import Clipboard, { ClipboardProps } from 'components/actions/Clipboard'
import { TableColumn, TableRecord } from 'components/views/Table'
import User, { UserProps } from 'screens/views/User'
import { Markup, MarkupListProps } from 'screens/views/MarkupMenu'

export type ClipboardColumnOptions = Pick<ClipboardProps, 'content'>
export type ClipboardColumn<T extends TableRecord,> = TableColumn<T, ClipboardProps> & ClipboardColumnOptions

export const clipboardColumn = <T extends TableRecord>(column: ClipboardColumn<T>): ClipboardColumn<T> => ({
  width: 30,
  align: 'center',
  cell: Clipboard,
  mapper: (_, __, content) => ({ content }),
  ...column,
  props: {
    content: column.content,
    ...column.props,
  },
})

export const AttachColumn = <T extends TableRecord>(column: TextColumn<T>): TextColumn<T> => textColumn({
  name: 'Component',
  minWidth: 130,
  sort: (_, __, value) => !!value,
  mapper: (_, __, value) => {
    if (value) {
      return { content: 'Attached', color: 'success' }
    }

    return { content: 'Not Attached', color: 'error' }
  },
  ...column,
})


export type MarkupsColumnOptions = Pick<MarkupListProps, 'items'>
export type MarkupsColumn<T extends TableRecord,> = TableColumn<T, MarkupListProps> & MarkupsColumnOptions

export const markupsColumn = <T extends TableRecord>(column: MarkupsColumn<T>): MarkupsColumn<T> => ({
  minWidth: 170,
  align: 'center',
  cell: Markup.List,
  sort: (_, __, value: number[]) => value.length,
  mapper: (_, __, items) => ({ items, margin: 'auto' }),
  ...column,
})


export type UserColumnOptions = Partial<Pick<UserProps, 'id' | 'v'>>
export type UserColumn<T extends TableRecord,> = TableColumn<T, UserProps> & UserColumnOptions

export const userColumn = <T extends TableRecord>(column: UserColumn<T>): UserColumn<T> => ({
  minWidth: 100,
  cell: User,
  mapper: (_, __, user) => ({ id: user.id }),
  ...column,
})

export default {
  ...defaultColumns,
  user: userColumn,
  attach: AttachColumn,
  markups: markupsColumn,
  clipboard: clipboardColumn,
}
