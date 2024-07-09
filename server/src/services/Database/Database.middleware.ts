import mongoose from 'mongoose'
import { ref, ChangeStamps } from './Database.model'

// TODO: use async_hooks instead of stubs
const getUser = () => ({ id: new mongoose.Types.ObjectId(1).toString() })

export function UserStampsMiddleware(schema: mongoose.Schema<ChangeStamps>) {
  if (!schema.options.ChangeStamps) {
    return
  }

  schema.set('timestamps', true)

  schema.add({
    createdBy: ref('users'),
    updatedBy: ref('users'),
  })

  // bulkWrite doesn't work on pre save
  schema.pre('findOneAndUpdate', function preFindOneAndUpdate(this) {
    this.set('updatedBy', getUser())
  })

  schema.pre('updateMany', function preUpdateMany(this) {
    this.set('updatedBy', getUser())
  })

  schema.pre('validate', function preValidate(this) {
    const user = getUser()

    // protection if someone passes an empty object
    this.createdBy = this.createdBy?.id ? { id: this.createdBy.id } : user
    this.updatedBy = user
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
