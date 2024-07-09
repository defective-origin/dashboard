import { useMemo } from 'react'
import { ChangeStamps, Id } from '../api.type'
import api from '../api.endpoint'

const PATHNAME = 'system/support'

export type SupportRequestStatus = 'OPEN' | 'PENDING' | 'IN PROGRESS' | 'RESOLVED' | 'CLOSED'
export type SupportRequestActivity = ChangeStamps & {
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
  activity: SupportRequestActivity[]
  status: SupportRequestStatus
}

export const useSupportRequest = (id?: Id) => api.useRestReadEndpoint<SupportRequest>(`${PATHNAME}/${id}`)
export const useSupportRequests = () => api.useRestReadEndpoint<SupportRequest[]>(PATHNAME)

export const useSupportMutations = () => {
  const create = api.useRestCreateEndpoint<SupportRequest>(PATHNAME)
  const update = api.useRestUpdateEndpoint<SupportRequest>(PATHNAME)
  const remove = api.useRestDeleteEndpoint(PATHNAME)

  return useMemo(() => ({ create, update, remove }), [create, remove, update])
}
