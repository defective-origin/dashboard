import { Color, Id, META, Meta } from './api.type'
import api from './api.endpoint'
import { useState } from 'react'
import { Square } from 'tools/XY'



const ENDPOINT = 'boards'

export type DashboardMarkupWidget = {
  preset: Id
  view: Id
  place: Square
  border: boolean | Color
  background: boolean | Color
}

export const MARKUP_WIDGETS: DashboardMarkupWidget[] = [
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
  preset: id,
  view: id,
  place,
  border: true,
  background: true,
}))

export const DASHBOARD_DEVICES: DashboardMarkupType[] = ['tv', 'computer', 'tablet', 'mobile', 'watch']

export type DashboardMarkupType = 'tv' | 'computer' | 'tablet' | 'mobile' | 'watch' // 'infinity'
export type DashboardMarkup = {
  /** Active layout. By default only computer markup is on */
  active: boolean
  /** Quantity of rows */
  rows: number
  /** Quantity of columns */
  columns: number
  type: DashboardMarkupType
  widgets: DashboardMarkupWidget[]
}

export type Dashboard = Meta & {
  markups: DashboardMarkup[]
}

const DASHBOARDS: Dashboard[] = Array.from({length: 21}, (_, id) => ({
  ...META,
  markups: [
    { rows: 10, columns: 20, widgets: MARKUP_WIDGETS, type: 'tv', active: id % 2 === 0 },
    { rows: 10, columns: 20, widgets: MARKUP_WIDGETS, type: 'computer', active: true },
    { rows: 10, columns: 20, widgets: MARKUP_WIDGETS, type: 'tablet', active: id % 6 === 0 },
    { rows: 10, columns: 20, widgets: MARKUP_WIDGETS, type: 'mobile', active: id % 4 === 0 },
    { rows: 10, columns: 20, widgets: MARKUP_WIDGETS, type: 'watch', active: id % 5 === 0 },
  ],
}))

api.reg(ENDPOINT, DASHBOARDS)


export const useDashboardMutations = (ids?: Id | Id[]) => {
  return api.useMutations<Dashboard>(ENDPOINT, ids)
}

export const useDashboards = () => {
  return api.useListEndpoint<Dashboard>(ENDPOINT)
}

export const useDashboard = (id?: Id) => {
  // const response = api.useOptionsEndpoint(`${ENDPOINT}/${id}`)
  const response = api.useOptionsEndpoint<Dashboard>(ENDPOINT, id)
  // TODO: setDevice after loading by active flag
  const [device, setDevice] = useState<DashboardMarkupType>('computer')
  const markup = response.markups?.find((markup) => markup.type === device)

  const isMarkup = (value: DashboardMarkupType) => device === value
  const clear = () => {
    if (markup?.widgets) {
      markup.widgets = []
      response.update(response.data)
    }
  }
  // TODO:  add, remove, create

  return { ...response, device, markup, isMarkup, setDevice, clear }
}














