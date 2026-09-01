import mongoose from 'mongoose'
import { FeatureFlag } from './FeatureFlag.model'

export default Array.from({length: 10}, (_, i): FeatureFlag => ({
  id: new mongoose.Types.ObjectId().toString(),
  name: `NAME_${i}`,
  active: true,
}))
