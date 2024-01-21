import { useMemo } from 'react'
import useProperty from '../UseProperty'

export type PropertiesOptions<T extends Record<string, string>> = T & {
  ref?: React.MutableRefObject<Element>
}

export type PropertiesReturnOptions<T extends Record<string, string>> = T

/**
 * Hook descriptions
 *
 * @example
 * const options = useProperties(conf)
 */
export const useProperties = <T extends Record<string, string>>(
  options: PropertiesOptions<T>,
  deps: unknown[] = [],
): PropertiesReturnOptions<T> => {
  const { ref, ...properties } = options
  const property = useProperty({ ref }, deps)

  return useMemo(() => Object.keys(properties).reduce((acc, key) => {
    acc[key as keyof T] = property(properties[key]) as T[keyof T]

    return acc
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, {} as T), [property])
}

export default useProperties
