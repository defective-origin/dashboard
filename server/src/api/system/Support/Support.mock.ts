import mongoose from 'mongoose'
import { SupportRequest } from './Support.model'

export default Array.from({length: 10}, (_, i): SupportRequest => ({
  id: new mongoose.Types.ObjectId(i).toString(),
  reason: 'BUG',
  content: 'report description',
  urgency: 'CRITICAL',
  attach: [],
  activity: [
    {
      id: new mongoose.Types.ObjectId(0).toString(),
      status: 'OPEN',
      content: '',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId(1).toString(),
      content: 'Comment 1',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId(2).toString(),
      status: 'PENDING',
      content: '',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId(3).toString(),
      content: 'Comment 2',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId(4).toString(),
      status: 'IN PROGRESS',
      content: '',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId(5).toString(),
      content: 'Comment 3',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId(6).toString(),
      status: 'RESOLVED',
      content: '',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId(7).toString(),
      status: 'CLOSED',
      content: '',
      attach: [],
    },
  ],
}))
