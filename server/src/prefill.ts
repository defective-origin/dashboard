import dotenv from 'dotenv'
import Database, { prefill } from './services/Database'
import { Storage } from '@tools'
import api from './api'
import users from './api/account/User/User.mock'

dotenv.config()

Storage.set('user', { id: users[0].id })

Database.init()
Database.run()
  .then(() => prefill(api))
  .finally(() => Database.stop())
