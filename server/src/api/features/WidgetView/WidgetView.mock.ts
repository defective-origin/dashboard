import mongoose from 'mongoose'
import { WidgetView } from './WidgetView.model'
import feature from '../Feature'

export default Array.from({length: 10}, (_, i): WidgetView => ({
  ...feature[i],
}))
