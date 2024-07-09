import mongoose from 'mongoose'
import { ref, Ref } from '@services/Database'
import { Feature, FeatureSchema } from '../Feature'
import { Widget } from '../Widget'

export const PATHNAME = 'boards'


export type BoardCoordinate = {
  x: number
  y: number
}

export const BoardCoordinateSchema = new mongoose.Schema<BoardCoordinate>({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
})

export type BoardItem = {
  id: string
  widget: Ref<Widget>
  v1: BoardCoordinate
  v2: BoardCoordinate
}

export const BoardItemSchema = new mongoose.Schema<BoardItem>({
  widget: ref('widgets'),
  v1: { type: BoardCoordinateSchema, required: true },
  v2: { type: BoardCoordinateSchema, required: true },
})

export type BoardMarkupSize = 'INFINITY' | 'TV' | 'COMPUTER' | 'LAPTOP' | 'TABLET' | 'MOBILE' | 'WATCH'
export type BoardMarkup = {
  id: string
  /** Active layout. By default only `computer` markup is on */
  active: boolean
  rows: number
  columns: number
  size: BoardMarkupSize
  items: BoardItem[]
}

export const BoardMarkupSchema = new mongoose.Schema<BoardMarkup>({
  active: { type: Boolean, default: false },
  rows: { type: Number, default: 0 },
  columns: { type: Number, default: 0 },
  size: { type: String, enum: ['INFINITY', 'TV', 'COMPUTER', 'LAPTOP', 'TABLET', 'MOBILE', 'WATCH'] },
  items: { type: [BoardItemSchema], default: [] },
})

export type Board = Feature & {
  markups: BoardMarkup[]
  // TODO: widgets[] or view Id
}

export const BoardSchema = new mongoose.Schema<Board>({
  markups: { type: [BoardMarkupSchema], default: [] },
}).add(FeatureSchema)

export const BoardModel = mongoose.model(PATHNAME, BoardSchema)

export default BoardModel
