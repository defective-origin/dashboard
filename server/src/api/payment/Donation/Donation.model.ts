import mongoose from 'mongoose'
import { ChangeStamps, ref, Ref } from '@services/Database'

export const PATHNAME = 'payment/donation'

export type Donation = ChangeStamps & {
  id: string
  content: string
  meta: string
  value: number
  reason: Ref
}

export const DonationSchema = new mongoose.Schema<Donation>({
  content: { type: String, default: '' },
  meta: { type: String, default: '' },
  value: { type: Number, required: true },
  reason: ref('payment/expenses'),
}, { ChangeStamps: true })

export const DonationModel = mongoose.model(PATHNAME, DonationSchema)

export default DonationModel
