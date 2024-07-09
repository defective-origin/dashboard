import mongoose from 'mongoose'
import { Board } from './Board.model'
import feature from '../Feature'

export default Array.from({length: 10}, (_, i): Board => ({
  ...feature[i],
  markups: [
    { id: new mongoose.Types.ObjectId(0).toString(), active: false, rows: 40, columns: 80, items: [], size: 'INFINITY' },
    { id: new mongoose.Types.ObjectId(1).toString(), active: false, rows: 40, columns: 80, items: [], size: 'TV' },
    { id: new mongoose.Types.ObjectId(2).toString(), active: false, rows: 30, columns: 60, items: [], size: 'COMPUTER' },
    { id: new mongoose.Types.ObjectId(3).toString(), active: true, rows: 20, columns: 40, items: [], size: 'LAPTOP' },
    { id: new mongoose.Types.ObjectId(4).toString(), active: false, rows: 10, columns: 20, items: [], size: 'TABLET' },
    { id: new mongoose.Types.ObjectId(5).toString(), active: false, rows: 5, columns: 10, items: [], size: 'MOBILE' },
    { id: new mongoose.Types.ObjectId(6).toString(), active: false, rows: 5, columns: 10, items: [], size: 'WATCH' },
  ],
}))
