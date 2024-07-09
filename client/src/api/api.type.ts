export type Json = any
export type Id = string | number
export type Url = string
export type Email = `${string}@${string}.${string}`
export type Emails = Email[] // RepeatWithSep<Email, ','>


/** format: 2020-11-30T21:00:00.000Z */
export type IsoDate = string

/**
 * HTML/Json formatted text.
 * - Short max length: `255`
 * - Long max length: `1000`
 */
export type RichText = string

/** max length: `50` */
export type ShortText = string


export type Color = string


// /**
//  * Access cannot be less than the most strict access assigned to related items.
//  * Priority by access strictness: `public` -> `subscription` -> `private`
//  * - `PRIVATE` - available to user
//  * - `PUBLIC` - available to everyone
//  * - `PAY TO USE` - available after payment
//  * - `SUBSCRIPTION` - available to user and subscribers
//  */
// export type Access = 'PRIVATE' | 'PUBLIC' | 'PAY TO USE' | 'SUBSCRIPTION'
//  TODO: add staff or private?
/**
  * How other users can see and use current feature.
  * - `PRIVATE` - available to user [default]
  * - `PUBLIC` - available to everyone
  */
export type Access = 'PRIVATE' | 'PUBLIC'

export type Meta = {
  id: Id
  name: ShortText
  description?: RichText
  access: Access
  price: number
  user: Id
  tags: string[]
}

export const META: Meta = {
  id: 0,
  name: 'NAME',
  description: 'DESCRIPTION',
  access: 'PRIVATE',
  price: 1234567890.5,
  user: 0,
  tags: ['chart', 'bars', 'linear', 'donut', 's-curve'],
}
