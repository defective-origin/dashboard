import supertest from 'supertest'
import api from 'api'
import Router from './Router.service.js'

declare global {
  /** Mocked Express app instance for API integration testing */
  var server: supertest.Agent
}

// Initialize the Express router with API endpoints
const app = Router.init(api, '/')

// Initialize supertest with app routing before running tests
beforeAll(() => {
  // If the worker is reused, global.server might already be initialized.
  // We check for it to avoid redundant recreations during non-isolated runs.
  if (!global.server) {
    global.server = supertest(app as never)
  }
})
