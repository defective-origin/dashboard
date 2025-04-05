import { Router } from 'express'
import { UserModel, PATHNAME } from './User.model'

const router = Router()

router.get(`/${PATHNAME}`, (req, res, next) => {
  UserModel.find()
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}/:id`, (req, res, next) => {
  UserModel.findById(req.params.id)
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

export default router
