import mongoose from 'mongoose'
import { Tag } from './Tag.model'

export default Array.from({length: 10}, (_, i): Tag => ({
  id: new mongoose.Types.ObjectId(i).toString(),
  name: `NAME_${i}`,
  content: 'content '.repeat(100),
}))
