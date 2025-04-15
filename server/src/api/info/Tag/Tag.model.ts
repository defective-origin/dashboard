import mongoose from 'mongoose'
import { TimeStamps } from '@services/Database'

export const PATHNAME = 'info/tags'

export type Tag = TimeStamps & {
  id: string
  name: string
  content: string
}

export const TagSchema = new mongoose.Schema<Tag>({
  name: { type: String, required: true, unique: true },
  content: { type: String, default: '' },
}, { timestamps: true })

export const TagModel = mongoose.model(PATHNAME, TagSchema)

export default TagModel
