import { useState } from 'react'
import { Email, Id, ListResponse, OptionsResponse, Url, Version } from './api.type'


export type Widget = {
  /** Uniq id */
  id: Id
  /** Abstract Name */
  name: string
  /** Description of what the widget shows */
  description?: string
  /** Link to storybook */
  docs: Url
  /** Uniq author email */
  author: Email
  /** Widget build version. If not defined, then the latest version is used */
  version: Version
}

export const WIDGETS: Widget[] = Array.from({length: 10}, (_, id) => ({
  id,
  name: `WIDGET NAME ${id}`,
  author: 'author@gmail.com',
  version: '0.0.1',
  docs: 'google.com',
}))

export const useWidgets = (): ListResponse<Widget> => Object.assign([...WIDGETS], { loading: false })

export type WidgetManager = OptionsResponse<Widget> & {
  update: (patch: Partial<Widget>) => void
}

export const useWidget = (id?: Id): WidgetManager => {
  const [widget, setWidget] = useState<Widget>(WIDGETS.find((widget) => widget.id == id) as Widget)
  const update = (patch: Partial<Widget>) => setWidget((prev) => ({...prev, ...patch}))

  return { loading: false, ...widget, update }
}
