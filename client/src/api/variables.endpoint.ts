import { Id, IsoDate, Json, META, Meta } from './api.type'
import api from './api.endpoint'

//  TODO: provide functionality by getting value by {VAR.A.B.C}
//  TODO: merge all objects in array and return
const ENDPOINT = 'variables'

export type Variables = Meta & {
  value: Json
  date: IsoDate
}

export const VARIABLES: Variables[] = Array.from({length: 10}, () => ({
  ...META,
  value: {},
  date: new Date().toISOString(),
}))

api.reg(ENDPOINT, VARIABLES)

export const useVariables = (ids?: Id[]) => api.useListEndpoint<Variables>(ENDPOINT, ids)

export const useVariable = (id?: Id) => api.useOptionsEndpoint<Variables>(ENDPOINT, id)
