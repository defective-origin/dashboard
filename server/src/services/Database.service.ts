import mongoose from 'mongoose'

function configure() {
  mongoose.set("strictQuery", false)
}

export function init() {
  configure()

  return mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => console.log('MONGODB CONNECTED'))
    .catch((err) => {
      console.error('MONGODB CONNECTION ERROR')

      throw err
    })
} 

export function close() {
  return mongoose.disconnect()
    .then(() => console.log('MONGODB DISCONNECTED'))
}

export default {
  init,
  close,
}
