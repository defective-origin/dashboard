import { Id, Ref } from '../api.types'
import api from '../api.endpoint'
import { Feature } from './Feature.endpoint'

const PATHNAME = 'widgets'


export type Widget = Feature & {
  parent: Ref<Widget>
}

export const useWidget = (id?: Id) => api.useRestReadEndpoint<Widget>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useWidgets = () => api.useRestReadEndpoint<Widget[]>(PATHNAME)
export const useWidgetMutations = () => api.useRestMutations<Widget>(PATHNAME)
