import { NextFunction, Request, Response } from 'express'
import UserModel from '@api/account/User/User.model'
import { Storage } from '@tools'

export function ErrorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
  res.status(500).json(err)
}

export function NotFoundMiddleware(req: Request, res: Response, _next: NextFunction) {
  res.status(404).end()
}

export function RequestLoggerMiddleware (req: Request, res: Response, next: NextFunction) {
  console.log(`REQUEST [${new Date().toISOString()}]:`, req.method, req.get('host'), req.path, req.query, req.body)
  next()
}

// https://dev.to/george_k/using-asynclocalstorage-in-nodejs-real-world-use-cases-3ekd
export function AuthMiddleware (req: Request, res: Response, next: NextFunction) {
  // const authToken = req.header("x-auth-token"); // TODO: implement auth
  // if (!authToken) {
  //   return res.status(401).send('User not authenticated');
  // }

  Storage.init(() => {
    UserModel.findOne({})
    .then(user => {
      Storage.set('user', user?.toJSON())
      next()
    })
    .catch(next)
  })
}
