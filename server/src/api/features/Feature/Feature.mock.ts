import mongoose from 'mongoose'
import { Feature } from './Feature.model'

export default Array.from({length: 10}, (_, i): Feature => ({
  id: new mongoose.Types.ObjectId(i).toString(),
  name: `NAME_${i}`,
  price: i**i,
  content: 'content '.repeat(100),
  public: true,
  tags: ['tag 1', 'tag 2', 'tag 3'],
  reviews: Array.from({length: 10}, (_, i) => ({
    id: new mongoose.Types.ObjectId(i).toString(),
    rate: 3.5,
    content: 'content '.repeat(50),
  })),
  options: {
    theme: '{{global.theme}}',
    language: '{{global.lang}}',
    ...[
      {
        // // default
        // __value: 'value',
        // __onChange: 'onChange',
        value: 'range',
      }, {
        __value: 'filters',
        __onChange: 'onFiltersChange',
        filters: {
          from: 'range.from',
          to: 'range.to',
        },
      }
    ][i % 2],
    prop1: '{{state.range.from}}',
    prop2: '{{state.tags[0]}}',
    style: {
      border: '{{BORDER}}',
      background: 'gray',
    },
    service: {
      url: '{{env.api}}/api/items',
      interval: 1000,
      headers: {
        Authorization: 'Bearer {{ACCESS_TOKEN}}',
      },
    },
  },
}))
