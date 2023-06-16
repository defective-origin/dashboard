import { Router } from 'express'
import * as UserHandlers from './User.handlers'

export const router = Router()
export const PATHNAME = 'users'

router.get(`/${ PATHNAME }/:id`, (req, res, next) => {
  return UserHandlers.getUser(req.params.id)
    .then(records => res.json(records))
    .catch(next)
})

router.get(`/${ PATHNAME }`, (req, res, next) => {
  return UserHandlers.getUsers()
    .then(records => res.json(records))
    .catch(next)
})

router.post(`/${ PATHNAME }`, (req, res, next) => {
  return UserHandlers.addUser(req.body)
    .then(record => res.json(record))
    .catch(next)
})

router.delete(`/${ PATHNAME }/:userId`, (req, res, next) => {
  return UserHandlers.deleteUser(req.params.userId)
    .then(record => res.json(record)) //  TODO:  move  to middleware
    .catch(next)
})
