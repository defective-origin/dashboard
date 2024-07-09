import { Id, META, Meta, RichText, Url } from './api.type'
import api from './api.endpoint'


const ENDPOINT = 'services'

export type ServiceEndpointType = 'READ' | 'CREATE' | 'UPDATE' | 'DELETE'
export type ServiceEndpointMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'

export type ServiceEndpoint = {
  description: RichText
  method: ServiceEndpointMethod
  type: ServiceEndpointType
}

export type Service = Meta & {
  url: Url
  endpoints: ServiceEndpoint[]
}

export const SERVICES: Service[] = Array.from({length: 10}, () => ({
  ...META,
  url: '{VAR.DOMAIN}/widgets/{PROP.ID}',
  endpoints: [
    { description: 'DESCRIPTION', method: 'GET', type: 'READ' },
    { description: 'DESCRIPTION', method: 'PUT', type: 'CREATE' },
    { description: 'DESCRIPTION', method: 'POST', type: 'UPDATE' },
    { description: 'DESCRIPTION', method: 'DELETE', type: 'DELETE' }, // TODO: show template url example to user
  ],
}))

api.reg(ENDPOINT, SERVICES)

export const useServices = (ids?: Id[]) => api.useListEndpoint<Service>(ENDPOINT, ids)

export const useService = (id?: Id) => api.useOptionsEndpoint<Service>(ENDPOINT, id)
