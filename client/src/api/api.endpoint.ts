import { ENV } from 'App/App.conf'
import { Id, Url } from './api.type'
import { useEffect, useState } from 'react'

export type DBRecord = { id: Id }
export type ApiResponse<R extends object> = R & { loading: boolean, error?: unknown }
export type ApiMutation<P, R> = (payload?: P) => Promise<{ payload: R, error?: unknown }>

const MOCK_DB: Record<string, any> = {}

export const reg = (url: Url, mock: unknown | unknown[]) => {
  MOCK_DB[url] = mock
}

const API_STORE_EVENT_NAME = 'API_STORE_EVENT'



export const useEndpoint = <R extends object = any>(url: string, selector?: (value: any) => any): ApiResponse<R> => {
  const [, refresh] = useState(0)
  const payload = selector?.(MOCK_DB[url]) ?? MOCK_DB[url]

  useEffect(() => {
    console.log('Endpoint:', `${ENV.SYSTEM.BASE_URL}${ENV.SYSTEM.API}/${url}`)

    document.addEventListener(
      API_STORE_EVENT_NAME,
      () => refresh(Date.now()),
      false,
    )
  }, [url])

  return Object.assign(payload, { loading: false, errors: null })
}

export const useListEndpoint = <R extends object>(url: string, ids?: Id[]): ApiResponse<R[]> => {
  return useEndpoint(url, (value) => {
    if (Array.isArray(value) && ids) {
      const idList = Array.isArray(ids) ? ids : [ids]

      return idList.map((id) => value.find((item) => item.id === id))
    }

    return value
  })
}

export const useOptionsEndpoint = <R extends object>(url: string, id?: Id): ApiResponse<R> => {
  return useEndpoint(url, (value) => {
    if (Array.isArray(value) && id) {
      return value.find((item) => item.id === id) ?? value[0]
    }

    return value
  })
}

export const useMutationEndpoint = <P, R extends object = object>(url: string, action: (value: any, payload: any) => any): ApiMutation<P, R> => {
  return (payload) => {
    const [change, response] = action(MOCK_DB[url], payload)
    MOCK_DB[url] = change

    return Promise.resolve(response)
      .finally(() => document.dispatchEvent(new CustomEvent(API_STORE_EVENT_NAME)))
  }
}

export const useUpdateEndpoint = <P extends object, R extends object = object>(url: string): ApiMutation<P, R> => {
  return useMutationEndpoint(url, (items, payload) => {
    let response
    const change = items.map((item: any) => {
      if (item.id === payload.id) {
        return response = { ...item, ...payload }
      }

      return item
    })

    return [change, response]
  })
}

export const useRemoveEndpoint = <R extends object = object>(url: string, defaultIds?: Id | Id[]): ApiMutation<Id | Id[] | undefined, R> => {
  return useMutationEndpoint(url, (items, payload) => {
    const idsToRemove = Array.isArray(payload ?? defaultIds) ? payload : [payload]
    const response: any[] = []
    const change = items.filter((item: any) => {
      if (idsToRemove.includes(item.id)) {
        response.push(item)

        return false
      }

      return true
    })

    return [change, response]
  })
}

export const useCreateEndpoint = <P extends object, R extends DBRecord>(url: string): ApiMutation<P, R> => {
  return useMutationEndpoint(url, (items, payload) => {
    const response = { ...payload, id: Date.now() }
    const change = [...items, response]

    return [change, response]
  })
}

export const useMutations = <R extends DBRecord>(url: string, ids?: Id | Id[]) => {
  const update = useUpdateEndpoint<R, R>(url)
  const remove = useRemoveEndpoint<R>(url, ids)
  const create = useCreateEndpoint<R, R>(url)

  return { update, remove, create }
}

export default {
  reg,
  useListEndpoint,
  useOptionsEndpoint,
  useUpdateEndpoint,
  useRemoveEndpoint,
  useCreateEndpoint,
  useMutations,
}
