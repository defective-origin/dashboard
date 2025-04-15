import { Router } from 'express'
import { ConfigModel, PATHNAME } from './Config.model'

const router = Router()

router.get(`/${PATHNAME}`, (req, res, next) => {
  ConfigModel.find()
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}/:id`, (req, res, next) => {
  ConfigModel.findById(req.params.id)
    .then(records => res.json(records)) //  TODO: move to middleware
    .catch(next)
})

router.post(`/${PATHNAME}`, (req, res, next) => {
  new ConfigModel(req.body).save()
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put(`/${PATHNAME}/:id`, (req, res, next) => {
  ConfigModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.delete(`/${PATHNAME}/:id`, (req, res, next) => {
  ConfigModel.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})


export default router
