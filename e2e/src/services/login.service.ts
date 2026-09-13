import http from 'http'

let info: any = null
let service: any = null

export const setup = async () => {
  if (service) {
    return resetInfo()
  }
  service = http.createServer((req, res) => {
    const match = req.url?.match(/^\/login\/(google|microsoft|apple)$/)

    if (!match) {
      res.writeHead(404)
      return res.end()
    }

    const provider = match[1]

    res.writeHead(200, {
      'Content-Type': 'application/json',
    })

    res.end(JSON.stringify({
      token: 'fake-token',
      user: {
        id: crypto.randomUUID(),
        email: info,
        name: 'Test User',
        provider,
      },
    }))
  }).listen(process.env.LOGIN, () => console.log('Login service on port:', process.env.LOGIN))
}

export const getInfo = async () => info

export const resetInfo = async () => {
  info = null
}

export const setInfo = async (email: string) => {
  info = email
}
