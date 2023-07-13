/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect } from 'react'
import useType, { TypeHandler, TypeOptions, TypeReturnOptions } from './UseType.hook'

export type ListOptions<T> = TypeOptions<T[]> & {
  sort?: Array<T>['sort']
  uniq?: (val: any) => any
}

export type ListReturnOptions<T> = TypeReturnOptions<Array<T>, ListOptions<T>>
  & TypeHandler<'concat', (...args: Parameters<Array<T>['concat']>) => void>
  & TypeHandler<'fill', (...args: Parameters<Array<T>['fill']>) => void>
  & TypeHandler<'filter', (...args: Parameters<Array<T>['filter']>) => void>
  & TypeHandler<'map', (...args: Parameters<Array<T>['map']>) => void>
  & TypeHandler<'reverse', (...args: Parameters<Array<T>['reverse']>) => void>
  & TypeHandler<'slice', (...args: Parameters<Array<T>['slice']>) => void>
  & TypeHandler<'sort', (...args: Parameters<Array<T>['sort']>) => void>
  & TypeHandler<'unshift', (...args: Parameters<Array<T>['unshift']>) => void>
  & TypeHandler<'push', (...args: Parameters<Array<T>['push']>) => void>
  & TypeHandler<'shift', (...args: Parameters<Array<T>['shift']>) => void>
  & TypeHandler<'pop', (...args: Parameters<Array<T>['pop']>) => void>
  & TypeHandler<'remove', (index: number | number[]) => void>
  & TypeHandler<'replace', (index: number, item: T) => void>
  & TypeHandler<'move', (from: number, to: number) => void>

export const LIST_DEFAULT_VALUE = []

export function useList<T>(init: T[] = LIST_DEFAULT_VALUE, options: ListOptions<T> = {}): ListReturnOptions<T> {
  const updatedOptions = { clear: LIST_DEFAULT_VALUE, ...options }
  const ref = useType(init, updatedOptions) as ListReturnOptions<T>

  // extend functionality
  useLayoutEffect(() => {
    // handlers
    ref.registerHandler('concat', (val, ...args: Parameters<Array<T>['concat']>) => val.concat(...args))
    ref.registerHandler('fill', (val, ...args: Parameters<Array<T>['fill']>) => [...val].fill(...args))
    ref.registerHandler('filter', (val, ...args: Parameters<Array<T>['filter']>) => val.filter(...args))
    ref.registerHandler('map', (val, ...args: Parameters<Array<T>['map']>) => val.map<any>(...args))
    ref.registerHandler('reverse', (val, ...args: Parameters<Array<T>['reverse']>) => [...val].reverse(...args))
    ref.registerHandler('slice', (val, ...args: Parameters<Array<T>['slice']>) => val.slice(...args))
    ref.registerHandler('sort', (val, ...args: Parameters<Array<T>['sort']>) => [...val].sort(...args))
    ref.registerHandler('unshift', (val, ...args: Parameters<Array<T>['unshift']>) => [...args, ...val])
    ref.registerHandler('push', (val, ...args: Parameters<Array<T>['push']>) => [...val, ...args])
    ref.registerHandler('shift', (val) => val.slice(1))
    ref.registerHandler('pop', (val) => val.slice(0, -1))
    ref.registerHandler('remove', (val, index) => {
      const indexSet = new Set(Array.isArray(index) ? index : [index])

      return val.filter((_, idx) => !indexSet.has(idx))
    })
    ref.registerHandler('replace', (val, index, item) => {
      const newList = [...val]

      val[index] = item

      return newList
    })
    ref.registerHandler('move', (val, from, to) => {
      const item = val[from]
      const items = val.filter((i) => i !== item)

      return [...items.slice(0, to), item, ...items.slice(to)]
    })

    // formats
    ref.registerFormat('sort', (val, ...args) => val.sort(...args))
    ref.registerFormat('uniq', (val, selector) => {
      const uniqValueSet = new Set()

      return val.filter((i) => {
        const value = selector(i)
        const isFirstValue = !uniqValueSet.has(value)

        uniqValueSet.add(value)

        return isFirstValue
      })
    })
  }, [ref])

  return ref
}

export default useList
