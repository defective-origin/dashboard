import mongoose from 'mongoose'

export interface IUser {
  name: string
}

export const UserSchema = new mongoose.Schema<IUser>({
  name: String,
})

export const UserModel = mongoose.model('user', UserSchema)
