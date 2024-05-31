import { Id, IsoDate, RichText, Url } from './api.type'
import { useListEndpoint } from './api.endpoint'

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

/** Return releases for item with passed `id` */
export const useReleases = (id?: Id) => useListEndpoint(`${ENDPOINT}/${id}`, [...RELEASES])
