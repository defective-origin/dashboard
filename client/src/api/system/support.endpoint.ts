import { ChangeStamps, Id } from '../api.types'
import api from '../api.endpoint'

const PATHNAME = 'system/support'

export type SupportRequestStatus = 'OPEN' | 'PENDING' | 'IN PROGRESS' | 'RESOLVED' | 'CLOSED'
export type SupportRequestAction = ChangeStamps & {
  id: string
  status?: SupportRequestStatus
  content?: string
  attach?: string[]
}


export type SupportRequestReason = 'REPORT' | 'SECURITY' | 'BUG' | 'QUESTION' | 'OTHER'
export type SupportRequestUrgency = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
export type SupportRequest = ChangeStamps & {
  id: string
  reason: SupportRequestReason
  urgency: SupportRequestUrgency
  content: string
  attach: string[]
  history: SupportRequestAction[]
  status: SupportRequestStatus
}

export const useSupportRequest = (id?: Id) => api.useRestReadEndpoint<SupportRequest>(`${PATHNAME}/${id}`)
export const useSupportRequests = () => api.useRestReadEndpoint<SupportRequest[]>(PATHNAME)
export const useSupportMutations = () => api.useRestMutations<SupportRequest>(PATHNAME)
