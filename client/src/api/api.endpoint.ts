import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'
import { ENV } from 'App/App.conf'
import { Id, Json } from './api.type'
import { apiClient } from './api.context'


const api = axios.create({
  baseURL: ENV.SYSTEM.API,
  timeout: 1000,
})


export type RestReadEndpointOptions<T = Json, E = Error> = Partial<UseQueryOptions<T, E>> & {
  request?: AxiosRequestConfig
}

export const useRestReadEndpoint = <T = Json, E = Error>(url: string, options?: RestReadEndpointOptions<T, E>) => {
  return useQuery<T, E>({
    ...options,
    queryKey: [url, options?.request?.params],
    queryFn: () => api.get(url, options?.request).then(response => response.data),
  })
}

export type RestMutationEndpointOptions<P = Json, T = Json, E = Error> = UseMutationOptions<T, E, P> & {
  pathname?: string
  method?: string
  url?: (payload: Json) => string
  invalidate?: (data: T, variables: Json, context: unknown) => unknown[]
  request?: AxiosRequestConfig
}

export const useRestMutationEndpoint = <P = Json, T = Json, E = Error>(options: RestMutationEndpointOptions<P, T, E>) => {
  const { pathname, method, request, invalidate, url, onSuccess, ...queryOptions } = options

  return useMutation<T, E, P>({
    ...queryOptions,
    mutationFn: (payload: Json) => api({
      method,
      url: url?.(payload) ?? pathname,
      data: payload,
      ...request,
    }).then(response => response.data),
    onSuccess: (data, variables, context) => {
      // refresh list of items
      apiClient.invalidateQueries({ queryKey: [pathname] })

      // refresh item
      if (invalidate) {
        apiClient.invalidateQueries({ queryKey: invalidate(data, variables, context) })
      }

      onSuccess?.(data, variables, context)
    },
  })
}



export const useRestCreateEndpoint = <P extends { id: Id }, T = Json, E = Error>(pathname: string, options?: RestMutationEndpointOptions<Omit<P, 'id'>, T, E>) => {
  return useRestMutationEndpoint<Omit<P, 'id'>, T, E>({
    pathname,
    method: 'post',
    url: () => pathname,
    ...options,
  })
}

export const useRestUpdateEndpoint = <P extends { id: Id }, T = Json, E = Error>(pathname: string, options?: RestMutationEndpointOptions<Partial<P>, T, E>) => {
  return useRestMutationEndpoint<Partial<P>, T, E>({
    pathname,
    method: 'put',
    url: payload => `${pathname}/${payload.id}`,
    invalidate: (_, payload) => [`${pathname}/${payload.id}`],
    ...options,
  })
}

export const useRestDeleteEndpoint = <P extends { id: Id }, T = Json, E = Error>(pathname: string, options?: RestMutationEndpointOptions<P, T, E>) => {
  return useRestMutationEndpoint<P, T, E>({
    pathname,
    method: 'delete',
    url: payload => `${pathname}/${payload.id}`,
    ...options,
  })
}


export default {
  useRestReadEndpoint,
  useRestCreateEndpoint,
  useRestUpdateEndpoint,
  useRestDeleteEndpoint,
}
