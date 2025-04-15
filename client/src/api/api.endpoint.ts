import { useMemo } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { MutateOptions, UseMutateAsyncFunction, useMutation, UseMutationOptions, UseMutationResult, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ENV } from 'App/App.conf'
import { Json, Ref } from './api.types'
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

export type RestMutationEndpointResult<P = Json, T = Json, E = Error> = UseMutateAsyncFunction<T, E, P, unknown> & UseMutationResult<T, E, P, unknown>

export const useRestMutationEndpoint = <P = Json, T = Json, E = Error>(options: RestMutationEndpointOptions<P, T, E>): RestMutationEndpointResult<P, T, E> => {
  const { pathname, method, request, invalidate, url, onSuccess, ...queryOptions } = options

  const mutation = useMutation<T, E, P>({
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

  return useMemo(() => {
    const mutate = (variables: P, options?: MutateOptions<T, E, P, unknown> | undefined) => mutation.mutateAsync(variables, options)
    Object.assign(mutate, mutation)

    return mutate
  }, [mutation]) as RestMutationEndpointResult<P, T, E>
}



export const useRestCreateEndpoint = <P extends Ref, T = Json, E = Error>(pathname: string, options?: RestMutationEndpointOptions<Omit<P, 'id'>, T, E>) => {
  return useRestMutationEndpoint<Omit<P, 'id'>, T, E>({
    pathname,
    method: 'post',
    url: () => pathname,
    ...options,
  })
}

export const useRestUpdateEndpoint = <P extends Ref, T = Json, E = Error>(pathname: string, options?: RestMutationEndpointOptions<Partial<P>, T, E>) => {
  return useRestMutationEndpoint<Partial<P>, T, E>({
    pathname,
    method: 'put',
    url: payload => `${pathname}/${payload.id}`,
    invalidate: (_, payload) => [`${pathname}/${payload.id}`], // generatePath(pathname, payload)
    ...options,
  })
}

export const useRestDeleteEndpoint = <P extends Ref, T = Json, E = Error>(pathname: string, options?: RestMutationEndpointOptions<Partial<P> | undefined, T, E>) => {
  return useRestMutationEndpoint<Partial<P> | undefined, T, E>({
    pathname,
    method: 'delete',
    url: payload => `${pathname}/${payload.id}`,
    ...options,
  })
}

export type MutationStatuses = Pick<UseMutationResult, 'isError' | 'isIdle' | 'isPaused' | 'isPending' | 'isSuccess'>
export const toMutationStatuses = (...mutations: MutationStatuses[]) => {
  const toStatus = (cb: (m: MutationStatuses) => boolean) => mutations.some(cb)

  return {
    isError: toStatus(m => m.isError),
    isIdle: toStatus(m => m.isIdle),
    isPaused: toStatus(m => m.isPaused),
    isPending: toStatus(m => m.isPending),
    isSuccess: toStatus(m => m.isSuccess),
  }
}

export const useRestMutations = <P extends Ref>(PATHNAME: string, options?: RestMutationEndpointOptions<Partial<P> | undefined>) => {
  const create = useRestCreateEndpoint<P>(PATHNAME, options as RestMutationEndpointOptions<Omit<P, 'id'>>)
  const update = useRestUpdateEndpoint<P>(PATHNAME, options)
  const remove = useRestDeleteEndpoint(PATHNAME, options)

  return useMemo(() => ({
    create,
    update,
    remove,
    ...toMutationStatuses(create, update, remove),
  }), [create, remove, update])
}


export default {
  useRestReadEndpoint,
  useRestCreateEndpoint,
  useRestUpdateEndpoint,
  useRestDeleteEndpoint,
  useRestMutations,
}
