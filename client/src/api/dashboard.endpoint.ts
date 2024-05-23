import { useState } from 'react'
import { Email, Id, ListResponse, OptionsResponse, Url } from './api.type'
import { WIDGETS, Widget } from './widget.endpoint'
import { Square } from 'tools/XY'

export type Place = Square

export type BoardProviderConf = {
  /** Endpoint Key for data type detection */
  key?: string
  /** Data provider endpoint */
  endpoint?: Url
}

export type BoardWidget = Widget & BoardProviderConf & {
  /** Origin widget Id */
  origin: Id
  /** Place on dashboard */
  place: Place
}

export type BoardDevice = 'tv' | 'computer' | 'tablet' | 'mobile' // 'infinity'

export const BOARD_DEVICES: BoardDevice[] = ['tv', 'computer', 'tablet', 'mobile']

export type BoardMarkup = {
  /** Quantity of rows */
  rows: number
  /** Quantity of columns */
  columns: number
  /** Board widgets */
  widgets: BoardWidget[]
}

export type Board = BoardProviderConf & {
  /** Uniq id */
  id: Id
  /** Origin board Id */
  origin?: Id
  /** Abstract Name */
  name: string
  /** Description of what the board shows */
  description?: string
  /** Uniq author email */
  author?: Email
  /** Markups for devices */
  devices: Partial<Record<BoardDevice, BoardMarkup>>
}

export const BOARD_WIDGETS: BoardWidget[] = [
  { v1: { x: 0, y: 0 }, v2: { x: 3, y: 3 } },
  { v1: { x: 0, y: 4 }, v2: { x: 1, y: 5 } },
  { v1: { x: 1, y: 4 }, v2: { x: 2, y: 5 } },
  { v1: { x: 2, y: 4 }, v2: { x: 3, y: 5 } },
  { v1: { x: 3, y: 4 }, v2: { x: 4, y: 5 } },
  { v1: { x: 4, y: 4 }, v2: { x: 5, y: 5 } },
  { v1: { x: 5, y: 4 }, v2: { x: 6, y: 5 } },
  { v1: { x: 0, y: 5 }, v2: { x: 6, y: 6 } },
  { v1: { x: 0, y: 6 }, v2: { x: 6, y: 10 } },
  { v1: { x: 9, y: 0 }, v2: { x: 18, y: 4 } },
  { v1: { x: 6, y: 4 }, v2: { x: 14, y: 7 } },
  { v1: { x: 6, y: 7 }, v2: { x: 14, y: 10 } },
  { v1: { x: 14, y: 4 }, v2: { x: 20, y: 5 } },
  { v1: { x: 14, y: 5 }, v2: { x: 20, y: 6 } },
  { v1: { x: 14, y: 6 }, v2: { x: 20, y: 7 } },
  { v1: { x: 14, y: 7 }, v2: { x: 17, y: 10 } },
  { v1: { x: 17, y: 7 }, v2: { x: 20, y: 10 } },
  { v1: { x: 18, y: 0 }, v2: { x: 20, y: 4 } },
].map((place, id) => ({
  id,
  origin: 1,
  name: 'WIDGET NAME',
  docs: 'google.com',
  author: 'author@gmail.com',
  version: '0.0.1',
  place,
}))

export const BASE_BREAKPOINT_MAP: Record<BoardDevice, BoardMarkup> = {
  tv: { widgets: BOARD_WIDGETS, rows: 10, columns: 20 },
  computer: { widgets: BOARD_WIDGETS, rows: 10, columns: 20 },
  tablet: { widgets: BOARD_WIDGETS, rows: 10, columns: 20 },
  mobile: { widgets: BOARD_WIDGETS, rows: 10, columns: 20 },
}

const BOARDS: Board[] = Array.from({length: 21}, (_, id) => ({
  id,
  origin: 1,
  name: `BOARD NAME ${id}`,
  description: undefined,
  author: 'author@email.com',
  devices: BASE_BREAKPOINT_MAP,
}))

export const useDashboards = (): ListResponse<Board> => Object.assign([...BOARDS], { loading: false })


export type DashboardManager = OptionsResponse<Board> & {
  markup: (device: BoardDevice) => BoardMarkup | undefined
  update: (patch: Partial<Board>) => void
  removeWidget: (device: BoardDevice, id: Id) => void
  addWidget: (device: BoardDevice, patch: BoardWidget) => void
  updateWidget: (device: BoardDevice, patch: Partial<BoardWidget>) => void
}

export const useDashboard = (id?: Id): DashboardManager => {
  const [board, setBoard] = useState<Board>(BOARDS.find((board) => board.id == id) as Board)
  const update = (patch: Partial<Board>) => setBoard((prev) => ({...prev, ...patch}))

  const markup = (device: BoardDevice) => board.devices[device]

  const updateMarkupWidgets = (device: BoardDevice, widgets: BoardWidget[] = []) => setBoard((prev) => ({
    ...prev,
    devices: {
      ...prev.devices,
      [device]: { ...prev.devices[device], widgets },
    },
  }))

  const addWidget = (device: BoardDevice, widget: BoardWidget) => updateMarkupWidgets(
    device,
    [...markup(device)?.widgets ?? [], { ...widget, id: markup(device)?.widgets.length } as BoardWidget],
  )

  const updateWidget = (device: BoardDevice, widget: Partial<BoardWidget>) => updateMarkupWidgets(
    device,
    markup(device)?.widgets.map((i) => (i.id === widget.id ? {...i, ...widget} : i)),
  )

  const removeWidget = (device: BoardDevice, id: Id) => updateMarkupWidgets(
    device,
    markup(device)?.widgets.filter((widget) => widget.id !== id),
  )

  return { loading: false, ...board, markup, update, addWidget, updateWidget, removeWidget }
}
