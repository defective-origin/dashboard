import mongoose, { Schema, SchemaTypeOptions } from 'mongoose'

export type TimeStamps = {
  createdAt?: Date
  updatedAt?: Date
}

export type UserStamps = {
  createdBy?: Ref
  updatedBy?: Ref
}

export type ChangeStamps = TimeStamps & UserStamps

export type ModelRef = { id: string }
export type Ref<T extends Ref = ModelRef> = ModelRef | T

export const RefSchema = new mongoose.Schema<Ref>({
  id: { type: String, required: true, unique: true }
}, { _id: false })
export const ref = (name?: string, opts: SchemaTypeOptions<any> = {}) => name ? ({ id: { type: Schema.Types.ObjectId, ref: name, ...opts } }) : ({ id: { type: Schema.Types.ObjectId, ...opts } })
export const refs = (opts: SchemaTypeOptions<any> = {}) => ({ type: [RefSchema], default: [], ...opts })
