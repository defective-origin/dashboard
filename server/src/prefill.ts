import dotenv from 'dotenv'
import Database, { prefill } from './services/Database'
import api from './api'

dotenv.config()

Database.init()
Database.run()
  .then(() => prefill(api))
  .finally(() => Database.stop())
