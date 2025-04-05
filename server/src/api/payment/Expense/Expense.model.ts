import mongoose from 'mongoose'
import { TimeStamps } from '@services/Database'

export const PATHNAME = 'payment/expenses'

export type ExpenseType = 'PLANS' | 'NEEDS' | 'OTHERS'
export type Expense = TimeStamps & {
  id: string
  name: string
  price: number
  value: number
  type: ExpenseType
}

export const ExpenseSchema = new mongoose.Schema<Expense>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  value: { type: Number, default: 0 },
  type: { type: String, default: 'OTHERS', enum: ['PLANS', 'NEEDS', 'OTHERS'] },
}, { timestamps: true })

export const ExpenseModel = mongoose.model(PATHNAME, ExpenseSchema)

export default ExpenseModel
