import { Schema } from 'mongoose'

export type ModelRef = { id: string }
export type Ref<T extends Ref = ModelRef> = ModelRef | T

export const ref = (ref: string) => ({ id: { type: Schema.Types.ObjectId, ref, required: true } })

// export const RichTextField = (opts: SchemaTypeOptions<string> = {}) => ({ type: String, maxlength: 4000, ...opts })
// export const TextField = (opts: SchemaTypeOptions<string> = {}) => ({ type: String, maxlength: 255, ...opts })

export type TimeStamps = {
  createdAt?: Date
  updatedAt?: Date
}

export type UserStamps = {
  createdBy?: Ref
  updatedBy?: Ref
}

export type ChangeStamps = TimeStamps & UserStamps

