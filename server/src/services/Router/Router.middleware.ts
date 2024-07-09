import { NextFunction, Request, Response } from 'express'


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

export function UserMiddleware (req: Request, res: Response, next: NextFunction) {
  // UserModel.findById(req.params.id, function (err, user) {
  //   req.user = user
  //   next()
  // })
  next()
}
