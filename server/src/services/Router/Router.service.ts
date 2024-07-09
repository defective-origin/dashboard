import express, { Router } from 'express'
import http from 'http'
import cors from 'cors'
import { AddressInfo } from 'net'
import * as CustomMiddleware from './Router.middleware'

export type Route = {
  router: Router
}

const app = express() // TODO: check Koa and fastify
const server = http.createServer(app)

export function init(routes: Route[], prefix = process.env.API_NAME) {
  // pre middleware
  app.use(
    express.json(),
    CustomMiddleware.RequestLoggerMiddleware,
    CustomMiddleware.UserMiddleware,
  )

  if (process.env.NODE_ENV === 'development') {
    app.use(cors())
  }

  // add route endpoints
  routes.forEach(route => app.use(prefix, route.router))
  
  // post middleware
  app.use(
    CustomMiddleware.NotFoundMiddleware,
    CustomMiddleware.ErrorMiddleware,
  )

  // add listener
  server.on('listening', () => console.log('Server started on port:', (server.address() as AddressInfo)?.port))
  server.on('close', () => console.warn('Server stopped.'))
  server.on('error', (err) => console.error('Server error: ', err))

  return server
}

export function run(port = process.env.API_PORT) {
  return server.listen(port)
}

export function stop() {
  return server.close()
}

export default {
  init,
  run,
  stop,
}
