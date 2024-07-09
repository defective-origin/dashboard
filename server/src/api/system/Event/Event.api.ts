import { Router } from 'express'
import { EventModel, PATHNAME } from './Event.model'

const router = Router()

router.get(`/${PATHNAME}`, (req, res, next) => {
  EventModel.find()
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}/:id`, (req, res, next) => {
  EventModel.findById(req.params.id)
    .then(records => res.json(records)) //  TODO: move to middleware
    .catch(next)
})

router.post(`/${PATHNAME}`, (req, res, next) => {
  new EventModel(req.body).save()
    .then(() => res.sendStatus(200))
    .catch(next)
})

export default router
