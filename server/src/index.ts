import dotenv from 'dotenv'
import Database from './services/Database'
import Router from './services/Router'
import api from './api'

dotenv.config()

// init services
Database.init()
Router.init(api)

// run services
Database.run()
Router.run()

// stop services
const stop = () => {
  Database.stop()
  Router.stop()
}

process.on('SIGHUP', stop) // close terminal
process.on('SIGINT', stop) // ctrl + C
process.on('SIGQUIT', stop) // ctrl + D
process.on('SIGTERM', stop) // stop process request
