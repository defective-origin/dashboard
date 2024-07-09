import { MongoMemoryServer } from 'mongodb-memory-server'
import Database from './Database.service'


let mongoServer: MongoMemoryServer
const database = Database.init()

// Create MongoDb database in memory and connect to it
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await database.connect(mongoServer.getUri())
})

// Clear database between all tests
beforeEach(async () => {
  const collections = await database.connection.db?.collections() ?? []

  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

// Close database connection and stop MongoDb after all tests
afterAll(async () => {
  await database.connection.close()
  await mongoServer.stop()
})
