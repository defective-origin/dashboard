import mongoose from 'mongoose'
import { Feature, FeatureSchema } from '../Feature'

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

export type Board = Feature & {
  markups: BoardMarkup[]
}

export const BoardSchema = new mongoose.Schema<Board>({
  markups: { type: [BoardMarkupSchema], default: [] },
}).add(FeatureSchema)


BoardSchema.virtual('widgets').get(function() {
  const all = this.markups.flatMap(markup => markup.areas).flat()

  return [...new Set(all)].filter(item => item !== '.')
})

export const BoardModel = mongoose.model(PATHNAME, BoardSchema)

export default BoardModel
