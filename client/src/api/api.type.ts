export type Id = string | number
export type Email = `${string}@${string}.${string}`

export type UrlProtocol = 'http://' | 'https://' | ''
export type UrlHost = `${string}.${string}`
export type UrlPath = `/${string}` | ''
export type Url = `${UrlProtocol}${UrlHost}${UrlPath}`

/** format: 2020-11-30T21:00:00.000Z */
export type IsoDate = string
/**
 * HTML formatted text.
 * - Short max length: `255`
 * - Long max length: `1000`
 */
export type RichText = string
/** max length: `50` */
export type ShortText = string
