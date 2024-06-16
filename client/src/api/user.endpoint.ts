import { Email, Id, ShortText } from './api.type'
import api from './api.endpoint'


const ENDPOINT = 'users'

export type User = {
  id: Id
  email: Email
  name: ShortText
  image?: string
}

export const USERS: User[] = Array.from({length: 10}, (_, id) => ({
  id,
  name: `User ${id}`,
  email: `user${id}@email.com`,
  image: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp',
}))

api.reg(ENDPOINT, USERS)

export const useUser = (id?: Id) => api.useOptionsEndpoint<User>(ENDPOINT, id)
