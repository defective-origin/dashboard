import { useMemo } from 'react'
import useProperty from '../UseProperty'

export type PropertiesOptions<T extends Record<string, string>> = T & {
  ref?: React.MutableRefObject<Element>
}

export type PropertiesReturnOptions<T extends Record<string, string>> = T

/**
 * Allows to get css variable values
 *
 * @example
 * const colors = useProperties({
 *  ref: elementRef.current, // body by default
 *  primary: '--primary-color',
 *  secondary: '--secondary-color',
 *  success: '--success-color',
 *  info: '--info-color',
 *  warning: '--warning-color',
 *  error: '--error-color',
 *  disable: '--disable-color',
 * }, deps)
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
