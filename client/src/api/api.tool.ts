import { generatePath } from 'react-router-dom'
import { ENV } from 'App/App.conf'
import { Id } from './api.type'

// TODO: move to file.api
export const img = (type: string, id: Id) => generatePath(ENV.SYSTEM.FILE_API, { type, id })
