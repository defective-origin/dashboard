import mongoose from 'mongoose'
import fs from 'fs'

let info: any = null
let service: mongoose.Mongoose | null = null

export const setup = async () => {
  if (service) {
    return resetInfo()
  }

  service = await mongoose.connect(process.env.MONGODB_URL ?? '')
}

export const getInfo = async () => info

export const resetInfo = async () => {
  await Promise.all(
    Object.values(mongoose.connection.collections)
      .map(collection => collection.deleteMany({})),
  )
}

export const setInfo = async (fileNames: string[]) => {
  info = {}

  return fileNames.flatMap(fileName => {
    const collections = JSON.parse(fs.readFileSync(`../fixtures/${fileName}.prefill.json`, 'utf8')) as Record<string, any[]>

    info[fileName] = collections

    return Object.entries(collections).map(([name, mock]) => {
      const model = Object.values(service?.connection.models ?? {})
        .find(model => model.collection.name === name)

      return model?.insertMany(mock)
    })
  })
}
