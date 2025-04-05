import mongoose from 'mongoose'
import { WidgetView } from './WidgetView.model'
import feature from '../Feature'

export default Array.from({length: 10}, (_, i): WidgetView => ({
  ...feature[i],
  releases: Array.from({length: 10}, (_, num) => ({
    id: new mongoose.Types.ObjectId(i).toString(),
    version: `${num}.${num}.${num}`,
    content: 'description',
    options: {},
  })),
}))
