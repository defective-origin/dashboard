import { Id } from './api.type'
import api from './api.endpoint'
import { Meta, useWidgets } from './widget.endpoint'
import { useState } from 'react'

const ENDPOINT = 'boards'

export type DashboardDevice = 'tv' | 'computer' | 'tablet' | 'mobile' | 'watch' // 'infinity'
export type DashboardDevices = Record<DashboardDevice, DashboardMarkup>

export const DASHBOARD_DEVICES: DashboardDevice[] = ['tv', 'computer', 'tablet', 'mobile', 'watch']

export type DashboardMarkup = {
  /** Active layout. By default only computer markup is on */
  active: boolean
  /** Quantity of rows */
  rows: number
  /** Quantity of columns */
  columns: number
}

export type Dashboard = Meta & {
  /** Markups for devices */
  devices: Partial<Record<DashboardDevice, DashboardMarkup>>
}

const DASHBOARDS: Dashboard[] = Array.from({length: 21}, (_, id) => ({
  id,
  image: 'https://shorturl.at/xJu8i',
  name: `BOARD NAME ${id}`,
  description: 'description '.repeat(50),
  author: id,
  access: 'PRIVATE',
  price: id ** 10,
  tags: ['finance', 'shares'],
  devices: {
    tv: { rows: 10, columns: 20, active: id % 2 === 0 },
    computer: { rows: 10, columns: 20, active: true },
    tablet: { rows: 10, columns: 20, active: id % 6 === 0 },
    mobile: { rows: 10, columns: 20, active: id % 4 === 0 },
    watch: { rows: 10, columns: 20, active: id % 5 === 0 },
  },
}))

api.reg(ENDPOINT, DASHBOARDS)


export const useDashboardMutations = (ids?: Id | Id[]) => {
  return api.useMutations<Dashboard>(ENDPOINT, ids)
}

export const useDashboards = () => {
  const response = api.useListEndpoint<Dashboard>(ENDPOINT)
  const mutations = useDashboardMutations()

  return Object.assign(response, mutations)
}

export const useDashboard = (id?: Id) => {
  // const response = api.useOptionsEndpoint(`${ENDPOINT}/${id}`)
  const response = api.useOptionsEndpoint<Dashboard>(ENDPOINT, id)
  const mutations = useDashboardMutations(id)
  const widgets = useWidgets()
  // TODO: setDevice after loading by active flag
  const [device, setDevice] = useState<DashboardDevice>('computer')
  const markup = response.devices?.[device]

  const isDevice = (value: DashboardDevice) => device === value
  const clear = () => widgets.remove(widgets.map((widget) => widget?.id as number))

  return { ...response, ...mutations, widgets, device, markup, isDevice, setDevice, clear }
}
