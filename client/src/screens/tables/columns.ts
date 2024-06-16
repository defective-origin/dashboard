import defaultColumns, { TextColumn, textColumn } from 'components/Table/Table.tool'
import Devices, { DeviceItems, DevicesProps } from 'screens/Devices'
import Clipboard, { ClipboardProps } from 'components/Clipboard'
import { TableColumn, TableRecord } from 'components/Table'
import Usage, { UsageProps } from 'screens/Usage'

export type ClipboardColumnOptions = Pick<ClipboardProps, 'content'>
export type ClipboardColumn<T extends TableRecord,> = TableColumn<T, ClipboardProps> & ClipboardColumnOptions

export const clipboardColumn = <T extends TableRecord>(column: ClipboardColumn<T>): ClipboardColumn<T> => ({
  width: 56,
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
  width: 130,
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
  width: 170,
  align: 'center',
  cell: Devices,
  sort: (_, __, value: DeviceItems) => Object.values(value).filter((device) => device.active).length,
  mapper: (_, __, items) => ({ items, margin: 'auto' }),
  ...column,
})

export type UsageColumnOptions = Partial<Pick<UsageProps, 'id' | 'v'>>
export type UsageColumn<T extends TableRecord,> = TableColumn<T, UsageProps> & UsageColumnOptions

export const usageColumn = <T extends TableRecord>(column: UsageColumn<T>): UsageColumn<T> => ({
  width: 85,
  align: 'center',
  cell: Usage,
  props: { margin: 'auto' },
  ...column,
})

export default {
  ...defaultColumns,
  usage: usageColumn,
  attach: AttachColumn,
  devices: devicesColumn,
  clipboard: clipboardColumn,
}
