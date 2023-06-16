import { useLayoutEffect } from 'react'
import useType, { TypeHandler, TypeOptions, TypeReturnOptions } from './UseType.hook'

export type ObjectReturnOptions<T extends Record<string, unknown>> = TypeReturnOptions<T>
  & TypeHandler<'merge', (...args: Partial<T>[]) => void>
  & TypeHandler<'delete', (key: keyof T) => void>
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
  useLayoutEffect(() => {
    // extra
    ref.has = (key) => key in ref.current
    ref.get = (key) => ref.current[key]

    // handlers
    ref.registerHandler('merge', (val, ...args) => Object.assign({}, val, ...args))
    ref.registerHandler('set', (val, key, value) => ({...val, [key]: value }))
    ref.registerHandler('delete', (val, key) => {
      const copy = {...val}

      delete copy[key]

      return copy
    })
  }, [ref])

  return ref
}

export default useObject
