export type Response = { loading: boolean, error?: unknown }
export type OptionsResponse<T> = T & Response
export type ListResponse<T> = T[] & Response

export type Id = string | number
export type Email = `${string}@${string}.${string}`
export type Version = `${string}.${string}.${string}`

export type UrlProtocol = 'http://' | 'https://' | ''
export type UrlHost = `${string}.${string}`
export type UrlPath = `/${string}` | ''
export type Url = `${UrlProtocol}${UrlHost}${UrlPath}`
