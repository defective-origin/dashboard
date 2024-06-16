import { Id, IsoDate, RichText } from './api.type'
import api from './api.endpoint'

const ENDPOINT = 'releases'

export type Version = `${number}.${number}.${number}`

export type Release = {
  id: Id
  /** Item for which the release was created  */
  for: Id
  /** Release version: `major.minor.patch`  */
  version: Version
  /** Describes release notes and data interfaces */
  description?: RichText
  /** When release was made. Can be overwritten */
  date: IsoDate
}

export const RELEASES: Release[] = Array.from({length: 4}, (_, id) => ({
  id,
  for: 0,
  version: `${id}.${id}.${id}`,
  description: 'RELEASE DESCRIPTION',
  date: new Date().toISOString(),
}))

api.reg(ENDPOINT, RELEASES)

/** Return releases for item with passed `id` */
export const useReleases = (id: Id) => api.useListEndpoint<Release>(ENDPOINT)
