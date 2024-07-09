import { Router } from 'express'
import { SubscriptionModel, PATHNAME } from './Subscription.model'

const router = Router()

router.get(`/${PATHNAME}`, (req, res, next) => {
  SubscriptionModel.find()
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}/:id`, (req, res, next) => {
  SubscriptionModel.findById(req.params.id)
    .then(records => res.json(records)) //  TODO: move to middleware
    .catch(next)
})

router.post(`/${PATHNAME}`, (req, res, next) => {
  new SubscriptionModel(req.body).save()
    .then(() => res.sendStatus(200))
    .catch(next)
})

// TODO: add api which check there is access in user?
export default router
