import { MongoMemoryServer } from 'mongodb-memory-server'
import Database from './Database.service.js'

let mongoServer: MongoMemoryServer
const database = Database.init()

// Create MongoDb database in memory and connect to it
beforeAll(async () => {
  // If worker is reused, mongoServer might already be running in this process
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create()
  }

  // Connect only if we are not connected yet
  if (database.connection.readyState === 0) {
    await database.connect(mongoServer.getUri())
  }
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
  // With isolate: false, we DO NOT close the global server/connection here, 
  // because another test file coming next in the same worker will need it.
  // Node.js will automatically clean up the processes when Vitest finishes.
  // await database.connection.close()
  // await mongoServer.stop()
})
