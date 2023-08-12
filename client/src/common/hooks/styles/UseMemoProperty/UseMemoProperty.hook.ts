import { useMemo } from 'react'
import useProperty, { UsePropertyOptions, UsePropertyReturnOptions } from '../UseProperty'

export type UseMemoPropertyCallback = (property: UsePropertyReturnOptions) => any

export type UseMemoPropertyOptions = UsePropertyOptions

export type UseMemoPropertyReturnOptions<T extends UseMemoPropertyCallback> = ReturnType<T>

/**
 * Hook descriptions
 *
 * @example
 * const options = useMemoProperty(conf)
 */
export const useMemoProperty = <C extends UseMemoPropertyCallback>(callback: C, options: UseMemoPropertyOptions = {}): UseMemoPropertyReturnOptions<C> => {
  const property = useProperty(options)

  return useMemo(() => callback(property), [property, callback])
}

export default useMemoProperty
