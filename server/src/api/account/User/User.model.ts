import mongoose from 'mongoose'
import { ChangeStamps } from '@services/Database'

export const PATHNAME = 'users'

export type UserRole = 'ADMIN' | 'USER' | 'TEMPORARY' | 'SYSTEM'
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'
export type UserSettingsTheme = 'LIGHT' | 'DARK'
export type User = ChangeStamps & {
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

export const UserModel = mongoose.model(PATHNAME, UserSchema)

export default UserModel
