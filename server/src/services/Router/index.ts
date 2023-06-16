import express, { Express, Router, NextFunction, Request, Response } from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import * as CustomMiddleware from './Router.middleware'
import { importFolder } from '../../tools'

export type Middleware = ((req: Request, res: Response, next: NextFunction) => void)
            | ((err: Error, req: Request, res: Response, next: NextFunction) => void)

export type Endpoint = {
  router: Router;
  preMiddleware?: Middleware[];
  postMiddleware?: Middleware[];
}

const endpoints = importFolder<Endpoint>('api')

const PORT = process.env.API_PORT || 3000
const app = express()
const server = http.createServer(app)

function initPreMiddleware(app: Express, endpoints: Endpoint[]) {
  app.use(...[
    bodyParser.json(),
    CustomMiddleware.RequestLoggerMiddleware,
    CustomMiddleware.JsonResponseMiddleware,
    ...endpoints.flatMap((endpoint) => endpoint.preMiddleware || []),
  ])
}

function initPostMiddleware(app: Express, endpoints: Endpoint[]) {
  app.use(...[
    ...endpoints.flatMap((endpoint) => endpoint.postMiddleware || []),
    CustomMiddleware.NotFoundMiddleware,
    CustomMiddleware.ErrorMiddleware,
  ])
}


function initApi(app: Express, endpoints: Endpoint[]) {
  endpoints.forEach((endpoint) => app.use('/api', endpoint.router))
}

export async function init() {
  const syncedEndpoints = await endpoints

  initPreMiddleware(app, syncedEndpoints)
  initApi(app, syncedEndpoints)
  initPostMiddleware(app, syncedEndpoints)

  return server
    .on('listening', () => console.log('SERVER STARTED ON PORT:', PORT))
    .on('error', (err) => console.error('SERVER START ERROR: ', err))
    .on('close', () => console.log('SERVER STOPPED'))
    .listen(PORT)
}

export function close() {
  server.close()
}

export default {
  init,
  close,
}
