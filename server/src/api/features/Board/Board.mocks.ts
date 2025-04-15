import mongoose from 'mongoose'
import { Board } from './Board.model'
import widget from '../Widget'

export default Array.from({length: 10}, (_, i): Board => ({
  ...widget.mocks[i],
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
        ['1', '1', '2', '2', '4'],
        ['1', '1', '3', '3', '4'],
        ['5', '5', '5', '5', '4'],
        ['.', '.', '.', '.', '4']
      ],
      rows: ['1fr', '1fr', '1fr', '1fr'],
      columns: ['1fr', '1fr', '1fr', '1fr', '1fr'],
      gap: ['4px', '4px']
    },
  ],
}))
