import { generatePath } from 'react-router-dom'
import { Id } from './api.types'

// TODO: move to file.api
export const img = (type: string, id: Id) => generatePath(import.meta.env.VITE_FILE_API, { type, id })
