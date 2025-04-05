import { TimeStamps } from '../api.type'
import api from '../api.endpoint'

const PATHNAME = 'payment/expenses'

export type ExpenseType = 'PLANS' | 'NEEDS' | 'OTHERS'
export type Expense = TimeStamps & {
  id: string
  name: string
  price: number
  value: number
  type: ExpenseType
}

export const useExpenses = (type: ExpenseType = 'OTHERS') => api.useRestReadEndpoint<Expense[]>(PATHNAME, { request: { params: { type } } })
