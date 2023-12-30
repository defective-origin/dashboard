import { useMemo } from 'react'
import useProperty from '../UseProperty'

export type UsePropertiesOptions<T extends Record<string, string>> = T & {
  ref?: React.MutableRefObject<Element>
}

export type UsePropertiesReturnOptions<T extends Record<string, string>> = T

/**
 * Hook descriptions
 *
 * @example
 * const options = useProperties(conf)
 */
export const useProperties = <T extends Record<string, string>>(
  options: UsePropertiesOptions<T>,
  deps: unknown[] = [],
): UsePropertiesReturnOptions<T> => {
  const { ref, ...properties } = options
  const property = useProperty({ ref }, deps)

  return useMemo(() => Object.keys(properties).reduce((acc, key) => {
    acc[key as keyof T] = property(properties[key]) as T[keyof T]

    return acc
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, {} as T), [property])
}

export default useProperties
