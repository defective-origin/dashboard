import { Router } from 'express'
import { ExpenseModel, PATHNAME } from './Expense.model'

const router = Router()

router.get(`/${PATHNAME}`, (req, res, next) => {
  ExpenseModel.find(req.query.type ? { type: req.query.type } : {})
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${PATHNAME}/:id`, (req, res, next) => {
  ExpenseModel.findById(req.params.id)
    .then(records => res.json(records)) //  TODO: move to middleware
    .catch(next)
})

router.post(`/${PATHNAME}`, (req, res, next) => {
  new ExpenseModel(req.body).save()
    .then(() => res.sendStatus(200))
    .catch(next)
})

// TODO: add api which check there is access in user?
export default router
