import { expect } from 'chai'
import mongoose from 'mongoose'
import mongoUnit from 'mongo-unit'
import fixture from './User.fixture.json'
import * as UserHandlers from './User.handlers'

const USERS_FIXTURE = fixture.users.map((user) => ({
  ...user,
  _id: new mongoose.Types.ObjectId(user._id),
}))

describe('[User] service', () => {
  beforeEach(() => mongoUnit.load(fixture))
  afterEach(() => mongoUnit.drop())

  describe('[getUsers] handler', () => {
    it('should return all records', async () => {
      await UserHandlers.getUsers()
        .then(records => {
          expect(records.length).to.equal(2)

          records.forEach((record, idx) => {
            expect(record._id).to.deep.equal(USERS_FIXTURE[idx]._id)
          })
        })
    })
  })

  // describe('[getUser] handler', () => {
  //   it('should return record by id', async () => {
  //     await UserHandlers.getUser('56d9bf92f9be48771d6fe5b2')
  //       .then(record => expect(record._id).to.deep.equal(USERS_FIXTURE[1]._id))
  //   })
  // })

  describe('[addUser] handler', () => {
    it('should add new record and return it', async () => {
      await UserHandlers.getUsers()
        .then(records => expect(records.length).to.equal(2))

      await UserHandlers.addUser({ name: 'NEW_RECORD' })
        .then(record => expect(record.name).to.equal('NEW_RECORD'))

      await UserHandlers.getUsers()
        .then(records => expect(records.length).to.equal(3))
    })
  })

  // describe('[deleteUser] handler', () => {
  //   it('should remove record by id and return it', async () => {
  //     await UserHandlers.getUsers()
  //       .then(records => expect(records.length).to.equal(2))

  //     await UserHandlers.deleteUser('56d9bf92f9be48771d6fe5b1')
  //       .then(record => expect(record.name).to.equal(USERS_FIXTURE[0].name))

  //     await UserHandlers.getUsers()
  //       .then(records => expect(records).to.equal(1))
  //   })
  // })
})
