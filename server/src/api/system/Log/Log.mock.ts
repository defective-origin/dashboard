import mongoose from 'mongoose'
import { Log } from './Log.model'

export default Array.from({length: 10}, (_, i): Log => ({
  id: new mongoose.Types.ObjectId(i).toString(),
  name: 'INFO',
  content: 'content',
  agent: 'MacBook (Chrome 86)',
}))
