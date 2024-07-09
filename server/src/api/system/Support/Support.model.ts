import mongoose from 'mongoose'
import { ChangeStamps } from '@services/Database'

export const PATHNAME = 'system/support'

// TODO: create ActivityListItemSchema [content, attach] and StatusActivityListItemSchema [content, attach, status] with pre save
export type SupportRequestStatus = 'OPEN' | 'PENDING' | 'IN PROGRESS' | 'RESOLVED' | 'CLOSED'
export type SupportRequestActivity = ChangeStamps & {
  id: string
  status?: SupportRequestStatus
  content?: string
  attach?: string[]
}

export const SupportRequestActivitySchema = new mongoose.Schema<SupportRequestActivity>({
  status: { type: String, enum: ['OPEN', 'PENDING', 'IN PROGRESS', 'RESOLVED', 'CLOSED'] },
  content: { type: String, default: '' },
  attach: { type: [String], default: [] },
}, { ChangeStamps: true })

// TODO: create ActivityListSchema [activity, content] and StatusActivityListSchema [activity, content, status] with pre save
export type SupportRequestReason = 'REPORT' | 'SECURITY' | 'BUG' | 'QUESTION' | 'OTHER'
export type SupportRequestUrgency = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
export type SupportRequest = ChangeStamps & {
  id: string
  reason: SupportRequestReason
  urgency: SupportRequestUrgency
  content: string
  attach: string[]
  activity: SupportRequestActivity[]
  // feedback
}

export const SupportSchema = new mongoose.Schema<SupportRequest>({
  reason: { type: String, default: 'OTHER', enum: ['REPORT', 'SECURITY', 'BUG', 'QUESTION', 'OTHER'] },
  urgency: { type: String, default: 'LOW', enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] },
  content: { type: String, required: true, maxlength: 4000 },
  attach: { type: [String], default: [] },
  activity: { type: [SupportRequestActivitySchema], default: [] },
}, { ChangeStamps: true })

SupportSchema.virtual('status').get(function() {
  return this.activity.findLast(a => a.status)?.status
})

export const SupportModel = mongoose.model(PATHNAME, SupportSchema)

export default SupportModel
