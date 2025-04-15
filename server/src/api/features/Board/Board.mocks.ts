import mongoose from 'mongoose'
import { Board } from './Board.model'
import feature from '../Feature'

export default Array.from({length: 10}, (_, i): Board => ({
  ...feature[i],
  options: {
    style: {
      border: '{{BORDER}}',
      background: 'white',
    },
    value: { // state
      search: 'search string',
      sort: true,
      count: 25,
      tags: ['a', 'b', 'c'],
      range: {
        from: "2011-10-05T14:48:00.000Z",
        to: "2011-11-05T14:48:00.000Z",
      },
    },
  },
  markups: [
    {
      width: 992,
      height: '100%',
      areas: [
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.']
      ],
      rows: ['1fr', '1fr', '1fr', '1fr'],
      columns: ['1fr', '1fr', '1fr', '1fr', '1fr'],
      gap: ['4px', '4px']
    },
  ],
}))
