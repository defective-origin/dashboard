/* eslint-disable no-var */

import supertest from 'supertest'
import Router from './Router.service'
import api from '../../api'


declare global {
  /** mocked express app for test  */
  var server: supertest.Agent
}

const app = Router.init(api, '/')

// Initialize supertest with app routing
beforeAll(() => {
  global.server = supertest(app as never)
})
