import { Model } from 'mongoose'

export type DatabaseCollection = {
  model: Model<any>
  mocks: object
}

export async function prefill(collections: DatabaseCollection[]) {
  console.info("Clear existing data ...")
  await Promise.all(collections.map(collection => collection.model.deleteMany({})))
  console.info("Existing data cleared")

  console.info("Insert mock data ...")
  await Promise.all(collections.map(collection => collection.model.insertMany(collection.mocks)))
  console.info("Mock data inserted")
}
