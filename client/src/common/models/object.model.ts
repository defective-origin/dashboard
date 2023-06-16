/* eslint-disable @typescript-eslint/no-explicit-any */
export type GenericObject = {
  [key: string]: any
}

export type ObjectWithDefault<T> = {
  default: T
}
