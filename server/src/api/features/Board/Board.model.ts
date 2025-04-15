import mongoose from 'mongoose'
import { ref, Ref, refs } from '@services/Database'
import { Feature, FeatureSchema } from '../Feature'
import { Widget } from '../Widget'

export const PATHNAME = 'boards'


export type BoardMarkupCoordinate = {
  x: number
  y: number
}

export const BoardMarkupCoordinateSchema = new mongoose.Schema<BoardMarkupCoordinate>({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
}, { _id : false })

export type BoardMarkupItem = {
  id: string
  widget: Ref<Widget>
  v1: BoardMarkupCoordinate
  v2: BoardMarkupCoordinate
}

export const BoardMarkupItemSchema = new mongoose.Schema<BoardMarkupItem>({
  widget: ref('widgets'),
  v1: { type: BoardMarkupCoordinateSchema, required: true },
  v2: { type: BoardMarkupCoordinateSchema, required: true },
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
  items: BoardMarkupItem[]
}

export const BoardMarkupSchema = new mongoose.Schema<BoardMarkup>({
  visible: { type: Boolean, default: false },
  expandable: { type: Boolean, default: false },
  rows: { type: Number, default: 0 },
  columns: { type: Number, default: 0 },
  device: { type: String, enum: ['BOARD', 'TV', 'COMPUTER', 'LAPTOP', 'TABLET', 'MOBILE', 'WATCH'] },
  items: { type: [BoardMarkupItemSchema], default: [] },
})

export type Board = Feature & {
  widgets: Ref<Feature>[]
  markups: BoardMarkup[]
}

export const BoardSchema = new mongoose.Schema<Board>({
  widgets: refs(),
  markups: { type: [BoardMarkupSchema], default: [] },
}).add(FeatureSchema)

export const BoardModel = mongoose.model(PATHNAME, BoardSchema)

export default BoardModel
