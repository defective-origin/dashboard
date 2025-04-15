import { Id } from '../api.types'
import api from '../api.endpoint'

const PATHNAME = 'info/guides'


export type Guide = {
  id: string
  name: string
  content: string
  disabled: boolean
}

export const useGuide = (id?: Id) => api.useRestReadEndpoint<Guide>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useGuides = () => api.useRestReadEndpoint<Guide[]>(PATHNAME)
export const useGuideMutations = () => api.useRestMutations<Guide>(PATHNAME)
