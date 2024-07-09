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
  widget: Ref
  v1: BoardCoordinate
  v2: BoardCoordinate
}

export type BoardMarkupSize = 'INFINITY' | 'TV' | 'COMPUTER' | 'LAPTOP' | 'TABLET' | 'MOBILE' | 'WATCH'
export const BOARD_MARKUP_SIZES: BoardMarkupSize[] = ['INFINITY', 'TV', 'COMPUTER', 'LAPTOP', 'TABLET', 'MOBILE', 'WATCH']

export type BoardMarkup = {
  active: boolean
  rows: number
  columns: number
  size: BoardMarkupSize
  items: BoardItem[]
}

export type Board = Feature & {
  markups: BoardMarkup[]
}

export const useBoard = (id?: Id) => api.useRestReadEndpoint<Board>(`${PATHNAME}/${id}`, { enabled: !!id })
export const useBoards = () => api.useRestReadEndpoint<Board[]>(PATHNAME)

export const useBoardMutations = () => {
  const create = api.useRestCreateEndpoint<Board>(PATHNAME)
  const update = api.useRestUpdateEndpoint<Board>(PATHNAME)
  const remove = api.useRestDeleteEndpoint(PATHNAME)

  return useMemo(() => ({ create, update, remove }), [create, remove, update])
}
