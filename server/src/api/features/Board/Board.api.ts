import { Router } from 'express'
import { BoardModel, PATHNAME } from './Board.model'

const router = Router()

router.get(`/${PATHNAME}`, (req, res, next) => {
  BoardModel.find()
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}/:id`, (req, res, next) => {
  BoardModel.findById(req.params.id)
    .then(records => res.json(records)) //  TODO: move to middleware
    .catch(next)
})

router.post(`/${PATHNAME}`, (req, res, next) => {
  new BoardModel(req.body).save()
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put(`/${PATHNAME}/:id`, (req, res, next) => {
  BoardModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.delete(`/${PATHNAME}/:id`, (req, res, next) => {
  BoardModel.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})

// markups
router.put(`/${PATHNAME}/:id/markups/:markupId`, (req, res, next) => {
  BoardModel.findOneAndUpdate(
    { "_id": req.params.id, "markups._id": req.params.markupId },
    { "$set": { "markups.$": req.body } },
  )
    .then(() => res.sendStatus(200))
    .catch(next)
})

// widgets
router.post(`/${PATHNAME}/:id/markups/:markupId/widgets`, (req, res, next) => {
  BoardModel.updateOne(
    { _id: req.params.id, 'markups._id': req.params.markupId },
    { $push: { 'markups.$.items': req.body } },
  )
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put(`/${PATHNAME}/:id/markups/:markupId/widgets/:widgetId`, (req, res, next) => {
  BoardModel.updateOne(
    { _id: req.params.id, 'markups._id': req.params.markupId },
    { $set: { 'markups.$.items.$[item]': req.body } },
    { arrayFilters: [{ 'item._id': req.params.widgetId }] },
  )
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.delete(`/${PATHNAME}/:id/markups/:markupId/widgets/:widgetId`, (req, res, next) => {
  BoardModel.updateOne(
    { _id: req.params.id, 'markups._id': req.params.markupId },
    { $pull: { 'markups.$.items': { _id: req.params.widgetId } } },
  )
    .then(() => res.sendStatus(200))
    .catch(next)
})

export default router
