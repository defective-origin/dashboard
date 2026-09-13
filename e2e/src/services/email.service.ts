import http from 'http'

let info: unknown[] = []
let service: any = null

export const setup = async () => {
  if (service) {
    return resetInfo()
  }
  service = http.createServer(async (req, res) => {
    let data = ''
    req.on('data', chunk => { data += chunk })
    req.on('end', () => {
      info.push(JSON.parse(data))
      res.end()
    })
  }).listen(process.env.EMAIL, () => console.log('Email service on port:', process.env.EMAIL))
}

export const getInfo = async () => info

export const resetInfo = async () => {
  info = []
}
