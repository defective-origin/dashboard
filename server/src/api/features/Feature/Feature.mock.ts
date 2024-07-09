import mongoose from 'mongoose'
import { Feature } from './Feature.model'

export default Array.from({length: 10}, (_, i): Feature => ({
  id: new mongoose.Types.ObjectId(i).toString(),
  name: `NAME_${i}`,
  price: i**i,
  content: 'content '.repeat(100),
  access: 'PUBLIC',
  tags: ['tag 1', 'tag 2', 'tag 3'],
  reviews: Array.from({length: 10}, (_, i) => ({
    id: new mongoose.Types.ObjectId(i).toString(),
    rate: 3.5,
    content: 'content '.repeat(50),
  })),
  options: {
    theme: 'light',
    language: 'en',
    service: {
      url: '{{API}}/api/items',
      headers: {
        Authorization: 'Bearer {{ACCESS_TOKEN}}',
      },
    },
    mapper: {
      'a.b': 'a.c.d',
      'b[0]': 'b',
    },
    styles: {
      border: '{{BORDER}}',
      background: 'gray',
    },
    filters: {
      from: '2011-10-05T14:48:00.000Z',
      to: '2011-10-05T14:48:00.000Z',
    },
  },
}))
