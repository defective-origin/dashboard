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
}, { _id : false })

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

export type BoardMarkupDevice = 'BOARD' | 'TV' | 'COMPUTER' | 'LAPTOP' | 'TABLET' | 'MOBILE' | 'WATCH'
export type BoardMarkup = {
  id: string
  /** Active layout. By default only `computer` markup is on */
  visible: boolean
  expandable: boolean
  rows: number
  columns: number
  device: BoardMarkupDevice
  items: BoardItem[]
}

export const BoardMarkupSchema = new mongoose.Schema<BoardMarkup>({
  visible: { type: Boolean, default: false },
  expandable: { type: Boolean, default: false },
  rows: { type: Number, default: 0 },
  columns: { type: Number, default: 0 },
  device: { type: String, enum: ['BOARD', 'TV', 'COMPUTER', 'LAPTOP', 'TABLET', 'MOBILE', 'WATCH'] },
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
