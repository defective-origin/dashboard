import { useState } from 'react'
import { Id } from './api.type'
import { WIDGETS, Widget } from './widget.endpoint'

export type Board = {
  id?: Id
  name: string
  description?: string
  rows: number
  columns: number
  widgets: Widget[]
}

const DASHBOARDS: Board[] = Array.from({length: 21}, (_, id) => ({
  id,
  name: `BOARD NAME  ${id}`,
  description: undefined,
  rows: 10,
  columns: 20,
  widgets: WIDGETS,
}))

export const useDashboards = () => ({ loading: false, items: DASHBOARDS })

export const useDashboard = (id?: Id) => {
  const [board, setBoard] = useState<Board>(DASHBOARDS.find((board) => board.id == id) as Board)
  const update = (patch: Partial<Board>) => setBoard((prev) => ({...prev, ...patch}))

  const addWidget = (widget: Widget) => setBoard((prev) => ({
    ...prev,
    widgets: [...prev.widgets, { ...widget, id: prev.widgets.length }],
  }))

  const updateWidget = (widget: Partial<Widget>) => setBoard((prev) => ({
    ...prev,
    widgets: prev.widgets.map((i) => (i.id === widget.id ? {...i, ...widget} : i)),
  }))

  const removeWidget = (id: Id) => setBoard((prev) => ({
    ...prev,
    widgets: prev?.widgets.filter((widget) => widget.id === id),
  }))

  return { loading: false, board, update, addWidget, updateWidget, removeWidget }
}
