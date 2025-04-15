import { useMemo } from 'react'
import { Id, Ref } from '../api.type'
import api, { toMutationStatuses } from '../api.endpoint'
import { Feature } from './Feature.endpoint'


const PATHNAME = 'boards'

export type BoardCoordinate = {
  x: number
  y: number
}

export type BoardItem = {
  id: string
  widget: Ref
  v1: BoardCoordinate
  v2: BoardCoordinate
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
  items: BoardItem[]
}

export type Board = Feature & {
  markups: BoardMarkup[]
}

export const useBoard = (id?: Id) => api.useRestReadEndpoint<Board>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useBoards = () => api.useRestReadEndpoint<Board[]>(PATHNAME)

export const useBoardMutations = (boardId?: Id, markupId?: Id) => {
  const board = api.useRestMutations<Board>(PATHNAME)
  const markup = api.useRestMutations<BoardMarkup>(`${PATHNAME}/${boardId}/markups`, {
    invalidate: () => [`${PATHNAME}/${boardId}`],
  })
  const widget = api.useRestMutations<BoardItem>(`${PATHNAME}/${boardId}/markups/${markupId}/widgets`, {
    invalidate: () => [`${PATHNAME}/${boardId}`],
  })

  return useMemo(
    () => ({ markup, widget, ...board, ...toMutationStatuses(board, markup, widget) }),
    [board, markup, widget],
  )
}
