import mongoose from 'mongoose'
import { TimeStamps } from '@services/Database'

export const PATHNAME = 'info/guides'

export type Guide = TimeStamps & {
  id: string
  name: string
  content: string
  disabled: boolean
}

export const GuideSchema = new mongoose.Schema<Guide>({
  name: { type: String, required: true },
  content: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
}, { timestamps: true })

export const GuideModel = mongoose.model(PATHNAME, GuideSchema)

export default GuideModel
