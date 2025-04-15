import { Id } from '../api.types'
import api from '../api.endpoint'

const PATHNAME = 'info/tags'


export type Tag = {
  id: string
  name: string
  content: string
}

export const useTag = (id?: Id) => api.useRestReadEndpoint<Tag>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useTags = () => api.useRestReadEndpoint<Tag[]>(PATHNAME)
export const useTagMutations = () => api.useRestMutations<Tag>(PATHNAME)
