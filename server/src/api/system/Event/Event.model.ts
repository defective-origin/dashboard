import mongoose from 'mongoose'
import { TimeStamps } from '@services/Database'

export const PATHNAME = 'system/events'

export type Event = TimeStamps & {
  id: string
  name: string
}

export const EventSchema = new mongoose.Schema<Event>({
  name: { type: String, required: true },
}, { timestamps: true })

export const EventModel = mongoose.model(PATHNAME, EventSchema)

export default EventModel
