import { NextFunction, Request, Response } from 'express'

export function RequestLoggerMiddleware (req: Request, res: Response, next: NextFunction) {
  console.log('REQUEST:', req.method, req.get('host'), req.path, req.query, req.body)
  next()
}

export function JsonResponseMiddleware(req: Request, res: Response, next: NextFunction) {
  const sendJson = res.json
  // It might be a little tricky here, because send supports a variety of arguments,
  // and you have to make sure you support all of them!
  res.json = function (body) {
    // Do something with the body...
    return sendJson.call(this, { success: res.statusCode === 200, body  })
  }

  next()
}

export function ErrorMiddleware(err, req: Request, res: Response, _next: NextFunction) {
  res.status(500).json(err)
}

export function NotFoundMiddleware(req: Request, res: Response, _next: NextFunction) {
  res.status(404).end()
}
