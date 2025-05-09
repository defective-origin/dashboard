import defaultColumns, { TextColumn, textColumn } from 'components/views/Table/Table.tool'
import Devices, { DeviceItems, DevicesProps } from 'screens/views/Devices'
import Clipboard, { ClipboardProps } from 'components/actions/Clipboard'
import { TableColumn, TableRecord } from 'components/views/Table'
import User, { UserProps } from 'screens/views/User'

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


export type DevicesColumnOptions = Pick<DevicesProps, 'items'>
export type DevicesColumn<T extends TableRecord,> = TableColumn<T, DevicesProps> & DevicesColumnOptions

export const devicesColumn = <T extends TableRecord>(column: DevicesColumn<T>): DevicesColumn<T> => ({
  minWidth: 170,
  align: 'center',
  cell: Devices,
  sort: (_, __, value: DeviceItems) => Object.values(value).filter(device => device.active).length,
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
  devices: devicesColumn,
  clipboard: clipboardColumn,
}
