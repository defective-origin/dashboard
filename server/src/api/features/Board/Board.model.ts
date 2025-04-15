import mongoose from 'mongoose'
import { Widget, WidgetSchema } from '../Widget/Widget.model'

export const PATHNAME = 'boards'

export type BoardMarkup = {
  width: number
  height: string
  gap: string[]
  rows: string[]
  columns: string[]
  areas: string[][]
}

export const BoardMarkupSchema = new mongoose.Schema<BoardMarkup>({
  width: { type: Number, required: true },
  height: { type: String, required: true },
  gap: { type: [String], required: true },
  rows: { type: [String], required: true },
  columns: { type: [String], required: true },
  areas: { type: [[String]], required: true },
}, { _id: false })


export type Board = Widget & {
  markups: BoardMarkup[]
}

export const BoardSchema = new mongoose.Schema<Board>({
  markups: { type: [BoardMarkupSchema], default: [] },
}).add(WidgetSchema)


BoardSchema.virtual('widgets').get(function() {
  const all = this.markups.flatMap(markup => markup.areas).flat()

  return [...new Set(all)].filter(item => item !== '.')
})

// TODO: recursively calculate price and access

export const BoardModel = mongoose.model(PATHNAME, BoardSchema)

export default BoardModel
