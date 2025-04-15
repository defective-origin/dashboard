export type Json = any
export type Id = string // | number
export type Url = string
export type Email = `${string}@${string}.${string}`
export type Emails = Email[] // RepeatWithSep<Email, ','>


/** Format: 2020-11-30T21:00:00.000Z */
export type IsoDate = string

/** max length: `4000` */
export type RichText = string

/** max length: `255` */
export type ShortText = string


export type ModelRef = { id: string }
export type Ref<T extends Ref = ModelRef> = ModelRef | T

export type TimeStamps = {
  createdAt?: IsoDate
  updatedAt?: IsoDate
}

export type UserStamps = {
  createdBy?: Ref
  updatedBy?: Ref
}

export type ChangeStamps = TimeStamps & UserStamps
