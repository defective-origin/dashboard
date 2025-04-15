import mongoose from 'mongoose'
import { Widget } from './Widget.model'
import feature from '../Feature'

export default Array.from({length: 10}, (_, i): Widget => ({
  ...feature[i],
  price: i**i,
  reviews: Array.from({length: 10}, (_, i) => ({
    id: new mongoose.Types.ObjectId(i).toString(),
    rate: 3.5,
    content: 'content '.repeat(50),
  })),
}))
