import { ENV } from 'App/App.conf'

export type ApiResponse<T extends object> = T & { loading: boolean, error?: unknown }

export const useEndpoint = <T extends object>(url: string, mock: T): ApiResponse<T> => {
  const payload = mock

  console.log('Endpoint:', `${ENV.SYSTEM.BASE_URL}${ENV.SYSTEM.API}/${url}`)

  return Object.assign(payload, { loading: false, errors: null })
}

export const useOptionsEndpoint = <T extends object>(url: string, mock: T): ApiResponse<Partial<T>> => {
  return useEndpoint(url, mock)
}

export const useListEndpoint = <T extends object[]>(url: string, mock: T): ApiResponse<T> => {
  return useEndpoint<T>(url, mock)
}
