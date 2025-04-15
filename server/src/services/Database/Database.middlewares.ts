import mongoose from 'mongoose'
import { ref, ChangeStamps } from './Database.schemas'
import { Storage } from '@tools'

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
  schema.pre('updateOne', function (this, next) {
    this.set('updatedBy', Storage.get('user'))
    next()
  })
  schema.pre('updateMany', function (this, next) {
    this.set('updatedBy', Storage.get('user'))
    next()
  })
  schema.pre('findOneAndUpdate', function (this, next) {
    this.set('updatedBy', Storage.get('user'))
    next()
  })

  schema.pre('validate', function (this, next) {
    const user = Storage.get('user')

    // protection if someone passes an empty object
    this.createdBy = this.createdBy?.id ? { id: this.createdBy.id } : user
    this.updatedBy = user
    next()
  })
}

export function SerializationMiddleware(schema: mongoose.Schema<ChangeStamps>) {
  schema.set('toJSON', {
    virtuals: true,
    transform: function (_, ret) {
      delete ret._id
      delete ret.__v
    },
  })
}
