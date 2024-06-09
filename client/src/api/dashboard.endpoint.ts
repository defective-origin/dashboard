import { useState } from 'react'
import { Id } from './api.type'
import { useListEndpoint, useOptionsEndpoint, ApiResponse } from './api.endpoint'
import { Meta, Widget } from './widget.endpoint'

const ENDPOINT = 'boards'

export type DashboardWidget = Widget
export type DashboardDevice = 'TV' | 'COMPUTER' | 'TABLET' | 'MOBILE' // 'infinity'

export const DASHBOARD_DEVICES: DashboardDevice[] = ['TV', 'COMPUTER', 'TABLET', 'MOBILE']

export type DashboardMarkup = {
  /** Active layout. By default only computer markup is on */
  active: boolean
  /** Quantity of rows */
  rows: number
  /** Quantity of columns */
  columns: number
  /** Board widget presets */
  widgets: DashboardWidget[]
}

export type Dashboard = Meta & {
  /** Markups for devices */
  devices: Partial<Record<DashboardDevice, DashboardMarkup>>
}

export const DASHBOARD_WIDGETS: DashboardWidget[] = [
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
  name: 'WIDGET NAME',
  type: 'PRESET',
  author: id,
  access: 'PRIVATE',
  key: 'WIDGET.KEY',
  endpoint: 'url.com',
  description: 'widget description',
  version: '0.0.0',
  versions: ['0.0.0'],
  place,
}))

export const BASE_BREAKPOINT_MAP: Record<DashboardDevice, DashboardMarkup> = {
  TV: { widgets: DASHBOARD_WIDGETS, rows: 10, columns: 20, active: false },
  COMPUTER: { widgets: DASHBOARD_WIDGETS, rows: 10, columns: 20, active: true },
  TABLET: { widgets: DASHBOARD_WIDGETS, rows: 10, columns: 20, active: false },
  MOBILE: { widgets: DASHBOARD_WIDGETS, rows: 10, columns: 20, active: false },
}

const DASHBOARDS: Dashboard[] = Array.from({length: 21}, (_, id) => ({
  id,
  name: `BOARD NAME ${id}`,
  description: 'dashboard description',
  author: id,
  access: 'PRIVATE',
  devices: BASE_BREAKPOINT_MAP,
}))

export const useDashboards = () => useListEndpoint(ENDPOINT, [...DASHBOARDS])


export type DashboardManager = ApiResponse<Dashboard> & {
  markup: (device: DashboardDevice) => DashboardMarkup | undefined
  update: (patch: Partial<Dashboard>) => void
  clear: (device: DashboardDevice) => void
  removeWidget: (device: DashboardDevice, id: Id) => void
  addWidget: (device: DashboardDevice, patch: DashboardWidget) => void
  updateWidget: (device: DashboardDevice, patch: Partial<DashboardWidget>) => void
}

export const useDashboard = (id?: Id): DashboardManager => {
  const response = useOptionsEndpoint(`${ENDPOINT}/${id}`, DASHBOARDS.find((board) => board.id == id) as Dashboard)
  const [board, setBoard] = useState<Dashboard>(DASHBOARDS.find((board) => board.id == id) as Dashboard)
  const update = (patch: Partial<Dashboard>) => setBoard((prev) => ({...prev, ...patch}))

  const markup = (device: DashboardDevice) => board.devices[device]

  const clear = (device: DashboardDevice) => updateMarkupWidgets(device, [])

  // TODO: save only id in dashboard
  // TODO: remove widgets by id list [id1, id2, id3]
  const updateMarkupWidgets = (device: DashboardDevice, widgets: DashboardWidget[] = []) => setBoard((prev) => ({
    ...prev,
    devices: {
      ...prev.devices,
      [device]: { ...prev.devices[device], widgets },
    },
  }))

  const addWidget = (device: DashboardDevice, widget: DashboardWidget) => updateMarkupWidgets(
    device,
    [...markup(device)?.widgets ?? [], { ...widget, id: markup(device)?.widgets.length } as DashboardWidget],
  )

  const updateWidget = (device: DashboardDevice, widget: Partial<DashboardWidget>) => updateMarkupWidgets(
    device,
    markup(device)?.widgets.map((i) => (i.id === widget.id ? {...i, ...widget} : i)),
  )

  const removeWidget = (device: DashboardDevice, id: Id) => updateMarkupWidgets(
    device,
    markup(device)?.widgets.filter((widget) => widget.id !== id),
  )

  return { loading: false, ...board, markup, update, clear, addWidget, updateWidget, removeWidget }
}
