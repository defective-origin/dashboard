import mongoose from 'mongoose'
import { Widget } from './Widget.model'
import feature from '../Feature'

export default Array.from({length: 10}, (_, i): Widget => ({
  ...feature[i],
  view: { id: new mongoose.Types.ObjectId(i).toString() },
}))
