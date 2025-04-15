import { useMemo } from 'react'
import { Id, Ref } from '../api.type'
import api, { toMutationStatuses } from '../api.endpoint'
import { Feature } from './Feature.endpoint'


const PATHNAME = 'boards'

export type BoardMarkupCoordinate = {
  x: number
  y: number
}

export type BoardMarkupItem = {
  id: string
  widget: Ref
  v1: BoardMarkupCoordinate
  v2: BoardMarkupCoordinate
}

export type BoardMarkupDevice = 'BOARD' | 'TV' | 'COMPUTER' | 'LAPTOP' | 'TABLET' | 'MOBILE' | 'WATCH'
export const BOARD_MARKUP_SIZES: BoardMarkupDevice[] = ['BOARD', 'TV', 'COMPUTER', 'LAPTOP', 'TABLET', 'MOBILE', 'WATCH']

export type BoardMarkup = {
  id: string
  visible: boolean
  expandable: boolean
  rows: number
  columns: number
  device: BoardMarkupDevice
  items: BoardMarkupItem[]
}

export type Board = Feature & {
  widgets: Ref<Feature>[]
  markups: BoardMarkup[]
}

export const useBoard = (id?: Id) => api.useRestReadEndpoint<Board>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useBoards = () => api.useRestReadEndpoint<Board[]>(PATHNAME)

export const useBoardMutations = (boardId?: Id, markupId?: Id) => {
  const board = api.useRestMutations<Board>(PATHNAME)
  const markup = api.useRestMutations<BoardMarkup>(`${PATHNAME}/${boardId}/markups`, {
    invalidate: () => [`${PATHNAME}/${boardId}`],
  })
  const widget = api.useRestMutations<BoardMarkupItem>(`${PATHNAME}/${boardId}/markups/${markupId}/widgets`, {
    invalidate: () => [`${PATHNAME}/${boardId}`],
  })

  return useMemo(
    () => ({ markup, widget, ...board, ...toMutationStatuses(board, markup, widget) }),
    [board, markup, widget],
  )
}
