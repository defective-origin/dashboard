import mongoose from 'mongoose'
import { TimeStamps } from '@services/Database'

export const PATHNAME = 'system/feature-flags'

export type FeatureFlag = TimeStamps & {
  id: string
  name: string
  active: boolean
}

export const FeatureFlagSchema = new mongoose.Schema<FeatureFlag>({
  name: { type: String, required: true, unique: true },
  active: { type: Boolean, default: false },
}, { timestamps: true })

export const FeatureFlagModel = mongoose.model(PATHNAME, FeatureFlagSchema)

export default FeatureFlagModel
