import { useMemo } from 'react'
import { Id, Ref } from '../api.type'
import api from '../api.endpoint'
import { Feature } from './Feature.endpoint'
import { WidgetView } from './WidgetView.endpoint'

const PATHNAME = 'widgets'


export type Widget = Feature & {
  view: Ref<WidgetView>
}

export const useWidget = (id?: Id) => api.useRestReadEndpoint<Widget>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useWidgets = () => api.useRestReadEndpoint<Widget[]>(PATHNAME)
export const useWidgetMutations = () => api.useRestMutations<Widget>(PATHNAME)
