import { Id, Ref } from '../api.types'
import api, { toMutationStatuses } from '../api.endpoint'
import { Feature } from './Feature.endpoint'


const PATHNAME = 'boards'

export type BoardMarkup = {
  width: number
  height: string
  gap: string[]
  rows: string[]
  columns: string[]
  areas: string[][]
}

export type Board = Feature & {
  widgets: string[]
  markups: BoardMarkup[]
}

export const useBoard = (id?: Id) => api.useRestReadEndpoint<Board>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useBoards = () => api.useRestReadEndpoint<Board[]>(PATHNAME)
export const useBoardMutations = () => api.useRestMutations<Board>(PATHNAME)
// TODO: () => ({ markup, widget, ...board, ...toMutationStatuses(board, markup, widget) })
