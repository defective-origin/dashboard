import { Email, Id } from './api.type'
import { useOptionsEndpoint } from './api.endpoint'


const ENDPOINT = 'users'

export type User = {
  id: Id
  email: Email
}

export const USER: User = { id: 0, email: 'user@email.com' }

export const useUser = () => useOptionsEndpoint(ENDPOINT, USER)
