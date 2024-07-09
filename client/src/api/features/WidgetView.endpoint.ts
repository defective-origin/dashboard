import { useMemo } from 'react'
import api from '../api.endpoint'
import { Id, TimeStamps } from '../api.type'
import { Feature } from './Feature.endpoint'

const PATHNAME = 'widget-views'


export type Release = TimeStamps & {
  version: string
  content: string
  options: object
}

export type WidgetView = Feature & {
  releases: Release[]
}



export const useWidgetView = (id?: Id) => api.useRestReadEndpoint<WidgetView>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useWidgetViews = () => api.useRestReadEndpoint<WidgetView[]>(PATHNAME)
// export const useWidgetViewReleases = (id?: Id) => api.useRestReadEndpoint<Release[]>(`${PATHNAME}/${id}/releases`)

export const useWidgetViewMutations = () => {
  const create = api.useRestCreateEndpoint<WidgetView>(PATHNAME)
  const update = api.useRestUpdateEndpoint<WidgetView>(PATHNAME)
  const remove = api.useRestDeleteEndpoint(PATHNAME)

  return useMemo(() => ({ create, update, remove }), [create, remove, update])
}
