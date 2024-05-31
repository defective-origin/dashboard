import { useState } from 'react'
import { Square } from 'tools/XY'
import { Id, RichText, ShortText, Url } from './api.type'
import { useListEndpoint, ApiResponse, useOptionsEndpoint } from './api.endpoint'
import { Version } from './release.endpoint'

const ENDPOINT = 'widgets'

/**
 * Access cannot be less than the most strict access assigned to related items.
 * Priority by access strictness: `public` -> `subscription` -> `private`
 * - `private` - available to user
 * - `public` - available to everyone
 * - `subscription` - available to user and subscribers
 */
export type Access = 'private' | 'public' | 'subscription'
export type Place = Square

// TODO: allow remove widget and widget version. After removing disable all presets with current widget version

export type Meta = {
  /** Uniq id. */
  id: Id
  /** Name name of content displayed */
  name?: ShortText
  /** Descriptions of content displayed */
  description?: RichText
  /** Creator id */
  author: Id
  /** User access. Private By default */
  access: Access
}

/** Releases can be received by `Id` */
export type Widget = Meta & {
  /** Component Id. If not set then show placeholder widget */
  for?: Id
  /** Last build version. If not defined, then the latest version is used or 0.0.0 if not exist */
  version: Version
  /** Endpoint Key for data type detection */
  key?: ShortText
  /** Data provider endpoint */
  endpoint?: Url
  /** Place on dashboard */
  place?: Place
}

export const WIDGETS: Widget[] = Array.from({length: 10}, (_, id) => ({
  id,
  name: `WIDGET NAME ${id}`,
  description: 'WIDGET DESCRIPTION',
  author: id,
  access: 'private',
  version: '0.0.0',
  versions: ['0.0.0'],
}))

export const useWidgets = () => useListEndpoint(ENDPOINT, [...WIDGETS])

export type WidgetManager = ApiResponse<Widget> & {
  update: (patch: Partial<Widget>) => void
}

export const useWidget = (id?: Id): WidgetManager => {
  const response = useOptionsEndpoint(`${ENDPOINT}/${id}`, WIDGETS.find((board) => board.id == id) as Widget)
  const [widget, setWidget] = useState<Widget>(WIDGETS.find((widget) => widget.id == id) as Widget)
  const update = (patch: Partial<Widget>) => setWidget((prev) => ({...prev, ...patch}))

  return { loading: false, ...widget, update }
}
