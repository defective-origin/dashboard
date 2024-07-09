import mongoose from 'mongoose'
import { ChangeStamps } from '@services/Database'

export const PATHNAME = 'payment/donation'

export type Donation = ChangeStamps & {
  id: string
  content: string
  value: number
}

export const DonationSchema = new mongoose.Schema<Donation>({
  content: { type: String, default: '' },
  value: { type: Number, required: true },
}, { ChangeStamps: true })

export const DonationModel = mongoose.model(PATHNAME, DonationSchema)

export default DonationModel
