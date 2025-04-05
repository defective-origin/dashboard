import mongoose from 'mongoose'
import { TimeStamps } from '@services/Database'
import { AccountModel } from '../Account'

export const PATHNAME = 'users'

export type UserRole = 'ADMIN' | 'USER' | 'TEMPORARY' | 'SYSTEM'
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'
export type UserSettingsTheme = 'LIGHT' | 'DARK'
export type User = TimeStamps & {
  id: string
  name: string
  email: string
  image: string
  role: UserRole
  status: UserStatus
  settings: {
    language: string
    theme: UserSettingsTheme
  }
}

export const UserSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  image: { type: String, default: '' },
  role: { type: String, default: 'USER', enum: ['ADMIN', 'USER', 'TEMPORARY', 'SYSTEM'] },
  status: { type: String, default: 'ACTIVE', enum: ['ACTIVE', 'INACTIVE', 'DELETED'] },
  settings: {
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'LIGHT', enum: ['LIGHT', 'DARK'] },
  },
}, { timestamps: true })


UserSchema.pre('save', function (next) {
  this.$locals.wasNew = this.isNew;
  next()
});

UserSchema.post('save', async function(doc, next){
  if(this.$locals.wasNew) {
    // TODO: save user for middleware
    await AccountModel.create({})
  }

  next();
});

export const UserModel = mongoose.model(PATHNAME, UserSchema)

export default UserModel
