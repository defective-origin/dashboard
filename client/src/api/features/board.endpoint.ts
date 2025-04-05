import { useMemo } from 'react'
import { Id, Ref } from '../api.type'
import api from '../api.endpoint'
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
  const create = api.useRestCreateEndpoint<Board>(PATHNAME)
  const update = api.useRestUpdateEndpoint<Board>(PATHNAME)
  const remove = api.useRestDeleteEndpoint(PATHNAME)
  const updateMarkup = api.useRestUpdateEndpoint<BoardMarkup>(`/${PATHNAME}/${boardId}/markups`, {
    invalidate: () => [`${PATHNAME}/${boardId}`],
  })

  const createWidget = api.useRestCreateEndpoint<BoardItem>(`/${PATHNAME}/${boardId}/markups/${markupId}/widgets`, {
    invalidate: () => [`${PATHNAME}/${boardId}`],
  })
  const updateWidget = api.useRestUpdateEndpoint<BoardItem>(`/${PATHNAME}/${boardId}/markups/${markupId}/widgets`, {
    invalidate: () => [`${PATHNAME}/${boardId}`],
  })
  const removeWidget = api.useRestDeleteEndpoint(`/${PATHNAME}/${boardId}/markups/${markupId}/widgets`, {
    invalidate: () => [`${PATHNAME}/${boardId}`],
  })

  return useMemo(
    () => ({ create, update, remove, updateMarkup, createWidget, updateWidget, removeWidget }),
    [create, createWidget, remove, removeWidget, update, updateMarkup, updateWidget],
  )
}

// export const useBoardMarkupWidgets = (id?: Id, markupId?: Id) => api.useRestReadEndpoint<Board>(`${PATHNAME}/markups/${markupId}/${id}/widgets`, { enabled: !!id, queryKey: [`${PATHNAME}/${id}`] })
