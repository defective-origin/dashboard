import { Router } from 'express'
import { TranslateModel, PATHNAME } from './Translate.model'

const router = Router()

router.get(`/${PATHNAME}`, (req, res, next) => {
  TranslateModel.find()
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}/:id`, (req, res, next) => {
  TranslateModel.findById(req.params.id)
    .then(records => res.json(records)) //  TODO: move to middleware
    .catch(next)
})

router.post(`/${PATHNAME}`, (req, res, next) => {
  new TranslateModel(req.body).save()
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put(`/${PATHNAME}/:id`, (req, res, next) => {
  TranslateModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.delete(`/${PATHNAME}/:id`, (req, res, next) => {
  TranslateModel.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})


// TODO: add routing for separated translates to prevent sending all translates in batch on create, update, delete

export default router
