import { ENV } from 'App/App.conf'
import { Id, Url } from './api.type'

export type TemplateKey = 'type' | 'id'
export type UrlParams = Record<TemplateKey, string | number>

export const url = (template: Url, params: Partial<UrlParams>): Url => {
  return Object.keys(params).reduce((acc, key) =>
    acc.replace(`:${key}`, params[key as TemplateKey] as string)
  , template) as Url
}

export const img = (type: string, id: Id) => url(ENV.SYSTEM.FILE_API as Url, { type, id })
