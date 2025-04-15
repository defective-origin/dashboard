import mongoose from 'mongoose'
import { Event } from './Event.model'

export default Array.from({length: 10}, (_, i): Event => ({
  id: new mongoose.Types.ObjectId(i).toString(),
  name: `NAME_${i}`,
}))
