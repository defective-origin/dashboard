import { Router } from 'express'
import { UserModel, PATHNAME, User } from './User.model'
import { Storage } from '@tools'

const router = Router()

router.get(`/auth`, (req, res, next) => {
  UserModel.findById(Storage.get('user').id, { staff: 0, bookmarks: 0 })
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}`, (req, res, next) => {
  UserModel.find({}, { staff: 0, bookmarks: 0 })
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}/:id`, (req, res, next) => {
  UserModel.findById(req.params.id, { settings: 0, staff: 0, bookmarks: 0 })
    .then(records => res.json(records)) //  TODO: move to middleware
    .catch(next)
})

router.post(`/${PATHNAME}`, (req, res, next) => {
  new UserModel(req.body).save()
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put(`/${PATHNAME}/:id`, (req, res, next) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.delete(`/${PATHNAME}/:id`, (req, res, next) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})


// bookmarks
router.get(`/${PATHNAME}/bookmarks/:id`, (req, res, next) => {
  const user = Storage.get('user') as User
  const bookmark = user.bookmarks.find(bookmark => bookmark.id === req.params.id)

  res.json(bookmark)
})

router.post(`/${PATHNAME}/bookmarks`, (req, res, next) => {
  UserModel.findByIdAndUpdate(
    Storage.get('user').id,
    { $addToSet: { bookmarks: { id: req.body.id } } },
  )
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.delete(`/${PATHNAME}/bookmarks/:id`, (req, res, next) => {
  UserModel.findByIdAndUpdate(
    Storage.get('user').id,
    { $pull: { bookmarks: { id: req.params.id } } },
  )
    .then(() => res.sendStatus(200))
    .catch(next)
})

export default router
