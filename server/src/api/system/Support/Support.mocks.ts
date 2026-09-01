import mongoose from 'mongoose'
import { SupportRequest } from './Support.model'

export default Array.from({length: 10}, (_, i): SupportRequest => ({
  id: new mongoose.Types.ObjectId().toString(),
  reason: 'BUG',
  content: 'report description',
  urgency: 'CRITICAL',
  attach: [],
  history: [
    {
      id: new mongoose.Types.ObjectId().toString(),
      status: 'OPEN',
      content: '',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId().toString(),
      content: 'Comment 1',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId().toString(),
      status: 'PENDING',
      content: '',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId().toString(),
      content: 'Comment 2',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId().toString(),
      status: 'IN PROGRESS',
      content: '',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId().toString(),
      content: 'Comment 3',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId().toString(),
      status: 'RESOLVED',
      content: '',
      attach: [],
    },
    {
      id: new mongoose.Types.ObjectId().toString(),
      status: 'CLOSED',
      content: '',
      attach: [],
    },
  ],
}))
