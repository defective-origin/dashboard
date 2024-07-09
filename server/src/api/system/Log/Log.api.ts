import { Router } from 'express'
import { LogModel, PATHNAME } from './Log.model'

const router = Router()

router.get(`/${PATHNAME}`, (req, res, next) => {
  LogModel.find()
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}/:id`, (req, res, next) => {
  LogModel.findById(req.params.id)
    .then(records => res.json(records)) //  TODO: move to middleware
    .catch(next)
})

router.post(`/${PATHNAME}`, (req, res, next) => {
  new LogModel(req.body).save()
    .then(() => res.sendStatus(200))
    .catch(next)
})

export default router
