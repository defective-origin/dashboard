import { useEffect, useState } from 'react'
import { ElementOptions, useElement } from '..'

export const getProperties = <T extends Record<string, string>>(element: Element | null, map: T) => {
  const styles = element && getComputedStyle(element)

  return Object.keys(map).reduce((acc, key) => {
    acc[key as keyof T] = styles?.getPropertyValue(map[key]) ?? ''

    return acc
  }, {} as PropertiesReturnOptions<T>)
}

export type PropertiesOptions<T extends Record<string, string>> = T & {
  ref?: ElementOptions<Element>
}

export type PropertiesReturnOptions<T extends Record<string, string>> = Record<keyof T, string>

/**
 * Allows to get css variables and other props [ex: for drawing in canvas]
 * https://stackoverflow.com/questions/71368314/can-i-set-a-canvas-fillstyle-with-a-variable-from-css
 *
 * @example
 * const colors = useProperties({
 *  ref: elementRef.current,
 *  primary: '--primary-color',
 *  secondary: '--secondary-color',
 *  success: '--success-color',
 *  info: '--info-color',
 *  warning: '--warning-color',
 *  error: '--error-color',
 *  disable: '--disable-color',
 * })
 */
export const useProperties = <T extends Record<string, string>>(options: PropertiesOptions<T>): PropertiesReturnOptions<T> => {
  const { ref, ...map } = options
  const elementRef = useElement(ref, document.body)
  const [result, setResult] = useState(() => getProperties(elementRef.current, map))

  // FIXME: auto update
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setResult(getProperties(elementRef.current, map)), [])

  return result as PropertiesReturnOptions<T>
}

export default useProperties
