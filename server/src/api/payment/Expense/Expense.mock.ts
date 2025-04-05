import mongoose from 'mongoose'
import { Expense, ExpenseType } from './Expense.model'

export default Array.from({length: 30}, (_, i): Expense => ({
  id: new mongoose.Types.ObjectId(i).toString(),
  name: `NAME_${i}`,
  type: ['PLANS', 'NEEDS', 'OTHERS'][i % 3] as ExpenseType,
  price: i * i * i,
  value: i * i,
}))
