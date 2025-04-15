import { Router } from 'express'
import { GuideModel, PATHNAME } from './Guide.model'

const router = Router()

router.get(`/${PATHNAME}`, (req, res, next) => {
  GuideModel.find()
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}/:id`, (req, res, next) => {
  GuideModel.findById(req.params.id)
    .then(records => res.json(records)) //  TODO: move to middleware
    .catch(next)
})

router.post(`/${PATHNAME}`, (req, res, next) => {
  new GuideModel(req.body).save()
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put(`/${PATHNAME}/:id`, (req, res, next) => {
  GuideModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.delete(`/${PATHNAME}/:id`, (req, res, next) => {
  GuideModel.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})

export default router
