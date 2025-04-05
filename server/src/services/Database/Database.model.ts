import { Schema, SchemaTypeOptions } from 'mongoose'

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

export const ref = (name?: string, opts: SchemaTypeOptions<any> = {}) => name ? ({ id: { type: Schema.Types.ObjectId, ref: name, required: true, ...opts } }) : ({ id: { type: Schema.Types.ObjectId, required: true, ...opts } })
export const refs = (name?: string, opts: SchemaTypeOptions<any> = {}) => ({ type: [ref(name)], default: [], ...opts })
