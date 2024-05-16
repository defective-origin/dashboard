export type Response = { loading: boolean, error?: unknown }
export type OptionsResponse<T> = T & Response
export type ListResponse<T> = T[] & Response

export type Id = string | number
