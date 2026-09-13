import mongoose from 'mongoose'
import { Storage } from 'tools'
import { ref, ChangeStamps, ModelRef } from './Database.schemas'

export function UserStampsMiddleware(schema: mongoose.Schema<ChangeStamps>) {
  if (!schema.options.ChangeStamps) {
    return
  }

  schema.set('timestamps', true)

  schema.add({
    createdBy: ref('users', { required: true }),
    updatedBy: ref('users', { required: true }),
  })

  // if you don't call next then tests will get errors
  // bulkWrite doesn't work on pre save
  schema.pre('updateOne', function () {
    this.set('updatedBy', Storage.get('user'))
  })
  schema.pre('updateMany', function () {
    this.set('updatedBy', Storage.get('user'))
  })
  schema.pre('findOneAndUpdate', function () {
    this.set('updatedBy', Storage.get('user'))
  })

  schema.pre('validate', function () {
    const user = Storage.get('user') as ModelRef

    // protection if someone passes an empty object
    this.createdBy = this.createdBy?.id ? { id: this.createdBy.id } : user
    this.updatedBy = user
  })
}

export function SerializationMiddleware(schema: mongoose.Schema<ChangeStamps>) {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
  })
}
