import { Router } from 'express'
import { DonationModel, PATHNAME } from './Donation.model'

const router = Router()

router.get(`/${PATHNAME}`, (req, res, next) => {
  DonationModel.find()
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}/:id`, (req, res, next) => {
  DonationModel.findById(req.params.id)
    .then(records => res.json(records)) //  TODO: move to middleware
    .catch(next)
})

router.post(`/${PATHNAME}`, (req, res, next) => {
  new DonationModel(req.body).save()
    .then(() => res.sendStatus(200))
    .catch(next)
})

export default router
