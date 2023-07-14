/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'
import useType, { TypeHandler, TypeOptions, TypeReturnOptions } from './UseType.hook'

export const omit = <T extends object, K extends keyof T>(val: T, ...keys: K[]) => {
  const copy = {...val}

  keys.forEach((key) => {
    delete copy[key]
  })

  return copy
}

export type ObjectReturnOptions<T extends Record<string, unknown>> = TypeReturnOptions<T>
  & TypeHandler<'merge', (...args: Partial<T>[]) => void>
  & TypeHandler<'omit', (...keys: (keyof T)[]) => void>
  & TypeHandler<'set', (key: keyof T, value: any) => void>
  & {
    has: (key: keyof T) => boolean
    get: (key: keyof T) => any
  }

export type ObjectOptions<T extends Record<string, unknown>> = TypeOptions<T>

export const OBJECT_DEFAULT_VALUE = {}

export function useObject<T extends Record<string, unknown>>(init: T = OBJECT_DEFAULT_VALUE as T, options: ObjectOptions<T> = {}): ObjectReturnOptions<T> {
  const updatedOptions = { clear: OBJECT_DEFAULT_VALUE as T, ...options }
  const ref = useType(init, updatedOptions) as ObjectReturnOptions<T>

  // extend functionality
  useMemo(() => {
    // extra
    ref.has = (key) => key in ref.current
    ref.get = (key) => ref.current[key]

    // handlers
    ref.registerHandler('merge', (val, ...args) => Object.assign({}, val, ...args))
    ref.registerHandler('set', (val, key, value) => ({...val, [key]: value }))
    ref.registerHandler('omit', omit)
    ref.registerHandler('pick', (val, ...keys) => {
      const copy = {...val}
      const omitKeys = Object.keys(copy).filter((key) => !keys.includes(key))

      return omit(val, ...omitKeys)
    })
  }, [ref])

  return ref
}

export default useObject
