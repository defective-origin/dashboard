import mongoUnit from 'mongo-unit'
import database from './app/services/Database.service'

mongoUnit.start()
  // this var process.env.DATABASE_URL = will keep link to fake mongo
  .then(() => process.env.DATABASE_URL = mongoUnit.getUrl())
  .then(() => database.init())
  // this line start mocha tests
  .then(() => run())
  .then(() => console.log('FAKE MONGO IS STARTED: ', mongoUnit.getUrl()))
  .then(() => console.log('FAKE DB CONNECTED'))

after(() =>
  mongoUnit.stop()
    .then(() => database.close())
    .then(() => console.log('FAKE DB DISCONNECTED')),
)
