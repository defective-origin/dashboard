import express, { Router } from 'express'
import http from 'http'
import cors from 'cors'
import { AddressInfo } from 'net'
import * as middlewares from './Router.middlewares'

export type Route = {
  api: Router
}

const app = express() // TODO: check Koa and fastify
const server = http.createServer(app)

export function init(routes: Route[], prefix = process.env.API_NAME) {
  // pre middleware
  app.use(
    express.json(),
    middlewares.AuthMiddleware,
    middlewares.RequestLoggerMiddleware,
  )

  if (process.env.NODE_ENV === 'development') {
    app.use(cors())
  }

  // add route endpoints
  routes.forEach(route => app.use(prefix, route.api))
  
  // post middleware
  app.use(
    middlewares.NotFoundMiddleware,
    middlewares.ErrorMiddleware,
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
