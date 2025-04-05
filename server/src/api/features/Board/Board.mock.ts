import mongoose from 'mongoose'
import { Board } from './Board.model'
import feature from '../Feature'

export default Array.from({length: 10}, (_, i): Board => ({
  ...feature[i],
  markups: [
    { id: new mongoose.Types.ObjectId(0).toString(), visible: false, expandable: false, rows: 50, columns: 100, items: [], device: 'BOARD' },
    { id: new mongoose.Types.ObjectId(1).toString(), visible: false, expandable: false, rows: 40, columns: 80, items: [], device: 'TV' },
    { id: new mongoose.Types.ObjectId(2).toString(), visible: true, expandable: false, rows: 30, columns: 60, device: 'COMPUTER', items: [{
      v1: { x: 0, y: 0 },
      v2: { x: 20, y: 10 },
      id: new mongoose.Types.ObjectId().toString(),
      widget: { id: new mongoose.Types.ObjectId(0).toString() }
    }, {
      v1: { x: 20, y: 10 },
      v2: { x: 40, y: 20 },
      id: new mongoose.Types.ObjectId().toString(),
      widget: { id: new mongoose.Types.ObjectId(1).toString() }
    }, {
      v1: { x: 40, y: 20 },
      v2: { x: 60, y: 30 },
      id: new mongoose.Types.ObjectId().toString(),
      widget: { id: new mongoose.Types.ObjectId(2).toString() }
    }] },
    { id: new mongoose.Types.ObjectId(3).toString(), visible: false, expandable: false,  rows: 20, columns: 40, items: [], device: 'LAPTOP' },
    { id: new mongoose.Types.ObjectId(4).toString(), visible: false, expandable: false,  rows: 10, columns: 20, items: [], device: 'TABLET' },
    { id: new mongoose.Types.ObjectId(5).toString(), visible: false, expandable: false,  rows: 5, columns: 10, items: [], device: 'MOBILE' },
    { id: new mongoose.Types.ObjectId(6).toString(), visible: false, expandable: false,  rows: 5, columns: 5, items: [], device: 'WATCH' },
  ],
}))
