import { useCallback } from 'react'
import { TimeStamps } from '../api.types'
import api from '../api.endpoint'

const PATHNAME = 'system/logs'

export type LogName = 'INFO' | 'WARN' | 'ERROR'
export type Log = TimeStamps & {
  id: string
  name: LogName
  agent: string
  content: string
}
export type LogReturnOptions = (name: LogName, content: string) => Promise<void>

export const useLog = (): LogReturnOptions => {
  const create = api.useRestCreateEndpoint<Log>(PATHNAME)

  return useCallback((name: LogName, content: string) => create({ name, content, agent: navigator.userAgent }), [create])
}
