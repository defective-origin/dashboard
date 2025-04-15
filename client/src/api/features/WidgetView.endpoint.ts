import api from '../api.endpoint'
import { Id } from '../api.type'
import { Feature } from './Feature.endpoint'

const PATHNAME = 'widget-views'

export type WidgetView = Feature



export const useWidgetView = (id?: Id) => api.useRestReadEndpoint<WidgetView>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useWidgetViews = () => api.useRestReadEndpoint<WidgetView[]>(PATHNAME)
export const useWidgetViewMutations = () => api.useRestMutations<WidgetView>(PATHNAME)
