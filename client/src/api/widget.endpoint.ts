import { Square } from 'tools/XY'
import { Id, RichText, ShortText, Url } from './api.type'
import api from './api.endpoint'
import { Version } from './release.endpoint'

const ENDPOINT = 'widgets'

/**
 * Access cannot be less than the most strict access assigned to related items.
 * Priority by access strictness: `public` -> `subscription` -> `private`
 * - `PRIVATE` - available to user
 * - `PUBLIC` - available to everyone
 * - `SUBSCRIPTION` - available to user and subscribers
 */
export type Access = 'PRIVATE' | 'PUBLIC' | 'SUBSCRIPTION' // TODO: PAYMENT
export type Place = Square

/**
 * ORIGIN: default config for registered component
 * PRESET: config for widget saved for reuse
 * CUSTOM: config for board
 */
export type WidgetType = 'ORIGIN' | 'PRESET' | 'CUSTOM'

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
  /** Preview image */
  image: string
  /** Price in order to use widget */
  price?: number
  /** Meta tags to look for */
  tags?: string[]
  // TODO: separate tables: rating(widget/board id, date, value), comments(widget/board id, date, value)
}

/** Releases can be received by `Id` */
export type Widget = Meta & {
  /** Component Id. If not set then show placeholder widget */
  for?: Id
  /** Widget config type */
  type?: WidgetType
  /** Last build version. If not defined, then the latest version is used or 0.0.0 if not exist */
  version: Version
  /** Endpoint Key for data type detection */
  key?: ShortText
  /** Data provider endpoint */
  endpoint?: Url
  /** Dashboard Id. Only Custom widgets can be mounted */
  board?: Id
  /** Place on dashboard */
  place?: Place
}

export const WIDGETS: Widget[] = [
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
  for: id % 2 ? id : undefined,
  price: id ** 10,
  name: `WIDGET NAME ${id}`,
  type: 'CUSTOM',
  image: 'https://shorturl.at/u34nd',
  author: id,
  access: 'PRIVATE',
  key: 'WIDGET.KEY',
  endpoint: 'url.com',
  description: 'widget description',
  version: `${id}.${id}.${id}`,
  tags: ['chart', 'bars', 'linear', 'donut', 's-curve'],
  place,
}))

api.reg(ENDPOINT, WIDGETS)


export const useWidgetMutations = (ids?: Id | Id[]) => {
  return api.useMutations<Widget>(ENDPOINT, ids)
}

export const useWidgets = (ids?: Id[]) => {
  const response = api.useListEndpoint<Widget>(ENDPOINT, ids)
  const mutations = useWidgetMutations(ids)

  return Object.assign(response, mutations)
}

export const useWidget = (id: Id) => {
  // const response = api.useOptionsEndpoint(`${ENDPOINT}/${id}`, id)
  const response = api.useOptionsEndpoint<Widget>(ENDPOINT, id)
  const mutations = useWidgetMutations(id)

  return { ...response, ...mutations }
}
