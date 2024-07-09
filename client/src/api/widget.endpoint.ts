import { Id, Json, META, Meta } from './api.type'
import api from './api.endpoint'
import { Service } from './service.endpoint'
import { Release, Version } from './release.endpoint'

const ENDPOINT = 'views'

// TODO: allow remove View and View version. After removing disable all presets with current view version
// TODO: separate tables: rating(widget/board id, date, value), comments(widget/board id, date, value)
// TODO: check component by url
// TODO: Images
// TODO: api/files/{ID} - to get files info
// TODO: file-store.com/{ID}/preview
// TODO: file-store.com/{ID}/screenshots

export type WidgetPreset = Meta & {
  props?: Json
  service: Service
  version: Version
}

export type WidgetView = Meta & {
  presets: WidgetPreset[]
  releases: Release[]
  services: []
}


export const WIDGET_VIEWS: WidgetView[] = Array.from({length: 10}, () => ({
  ...META,
  props: {
    items: [{ a: 1, b: 2 }, { a: 3, b: 4 }],
    options: {
      a: 'line',
      b: 'line',
    },
  },
  presets: [],
  releases: [],
  services: [],
}))

api.reg(ENDPOINT, WIDGET_VIEWS)


export const useWidgetViewMutations = (ids?: Id | Id[]) => {
  return api.useMutations<WidgetView>(ENDPOINT, ids)
}

export const useWidgetViews = (ids?: Id[]) => {
  return api.useListEndpoint<WidgetView>(ENDPOINT, ids)
}

// TODO: TODO: restful interface `${ENDPOINT}/${id}`
export const useWidgetView = (id?: Id) => {
  return api.useOptionsEndpoint<WidgetView>(ENDPOINT, id)
}
