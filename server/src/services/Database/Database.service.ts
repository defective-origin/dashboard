import mongoose from 'mongoose'
import { SerializationMiddleware, UserStampsMiddleware } from './Database.middleware'

// add plugins. It should be applied before model creation
// https://mongoosejs.com/docs/plugins.html#apply-plugins-before-compiling-models
mongoose.plugin(UserStampsMiddleware)
mongoose.plugin(SerializationMiddleware)

export function init() {
  mongoose.set("strictQuery", false)

  // add listener
  mongoose.connection.on('connected', () => console.log('Mongoose connection established.'))
  mongoose.connection.on('disconnected', () => console.warn('Mongoose connection disconnected.'))
  mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err))

  return mongoose
} 

export function run(url = process.env.MONGO_DATABASE_URL) {
  return mongoose.connect(url)
} 

export function stop() {
  return mongoose.disconnect()
}

export default {
  init,
  run,
  stop,
}
