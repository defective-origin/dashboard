import mongoose from 'mongoose'
import { ChangeStamps } from '@services/Database'

export const PATHNAME = 'payment/subscription'

export type Subscription = ChangeStamps & {
  id: string
  value: number
  expiredAt: Date
}

export const SubscriptionSchema = new mongoose.Schema<Subscription>({
  value: { type: Number, required: true },
  expiredAt: { type: Date, required: true },
}, { ChangeStamps: true })

export const SubscriptionModel = mongoose.model(PATHNAME, SubscriptionSchema)

export default SubscriptionModel
