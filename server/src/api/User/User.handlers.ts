import { IUser, UserModel } from './User.model'

export const getUser = (id: string) => UserModel.findById(id)
export const getUsers = () => UserModel.find()
export const addUser = (data: IUser) => new UserModel(data).save()
export const deleteUser = (id: string) => UserModel.findByIdAndDelete(id)
