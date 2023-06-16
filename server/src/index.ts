import dotenv from 'dotenv'
import { importFolder } from './tools'

export type Service = {
  init?(): Promise<void>;
  close?(): Promise<void>;
}

const services = importFolder<Service>('services')

async function init() {
  return Promise.all((await services).map((service) => service.init()))
}

async function close() {
  return Promise.all((await services).map((service) => service.close()))
}

dotenv.config()

init()
  .catch((err) => {
    console.error('ERROR: ', err)

    return close()
  })

process.on('SIGTERM', close)
