import mongoose from 'mongoose'
import { Subscription } from './Subscription.model'

export default Array.from({length: 10}, (_, i): Subscription => ({
  id: new mongoose.Types.ObjectId(i).toString(),
  value: i * i,
  expiredAt: new Date(),
}))
