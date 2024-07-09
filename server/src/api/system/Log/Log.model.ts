import mongoose from 'mongoose'
import { TimeStamps } from '@services/Database'

export const PATHNAME = 'system/logs'

export type LogName = 'INFO' | 'WARN' | 'ERROR'
export type Log = TimeStamps & {
  id: string
  name: LogName
  agent: string
  content: string
}

export const LogSchema = new mongoose.Schema<Log>({
  name: { type: String, required: true, enum: ['INFO', 'WARN', 'ERROR'] },
  content: { type: String, required: true },
  agent: { type: String, required: true },
}, { timestamps: true })

export const LogModel = mongoose.model(PATHNAME, LogSchema)

export default LogModel
