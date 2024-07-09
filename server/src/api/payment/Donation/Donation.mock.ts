import mongoose from 'mongoose'
import { Donation } from './Donation.model'

export default Array.from({length: 10}, (_, i): Donation => ({
  id: new mongoose.Types.ObjectId(i).toString(),
  content: 'content',
  value: i*i,
}))
