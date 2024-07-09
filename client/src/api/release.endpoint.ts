import { Id, IsoDate, RichText } from './api.type'
import api from './api.endpoint'

const ENDPOINT = 'releases'

/** Release version: `major.minor.patch`  */
export type Version = `${number}.${number}.${number}`

export type Release = {
  id: Id
  date: IsoDate
  version: Version
  description?: RichText
}

export const RELEASES: Release[] = Array.from({length: 4}, (_, id) => ({
  id,
  version: `${id}.${id}.${id}`,
  description: 'RELEASE DESCRIPTION',
  date: new Date().toISOString(),
}))

api.reg(ENDPOINT, RELEASES)

/** Return releases for item with passed `id` */
export const useReleases = (id: Id) => api.useListEndpoint<Release>(ENDPOINT)
