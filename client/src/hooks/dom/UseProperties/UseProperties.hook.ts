import { useLayoutEffect, useState } from 'react'
import useElement, { ElementOptions, ElementRef } from '../UseElement'

export const getProperties = <T extends Record<string, unknown>>(ref: React.RefObject<Element | null>, map: T) => {
  const styles = ref.current && getComputedStyle(ref.current)
  const props = Object.keys(map).reduce((acc, key) => {
    acc[key] = styles?.getPropertyValue(map[key] as string)

    return acc
  }, {} as Record<string, string | undefined>)

  return { ref, ...props }
}

export type PropertiesOptions<T extends Record<string, unknown>> = T & {
  ref?: ElementOptions<Element>
}

export type PropertiesReturnOptions<T extends Record<string, unknown>> = Record<Exclude<keyof T, 'ref'>, string | undefined> & {
  ref: ElementRef<Element>
}

/**
 * Allows to get css variables and other props [ex: for drawing in canvas]
 * https://stackoverflow.com/questions/71368314/can-i-set-a-canvas-fillstyle-with-a-variable-from-css
 * https://byby.dev/css-vars-with-js
 *
 * @example
 * const colors = useProperties({
 *  ref: elementRef.current,
 *  primary: '--primary-color',
 *  secondary: '--secondary-color',
 * }, [theme])
 */
export const useProperties = <T extends Record<string, unknown>>(
  options: PropertiesOptions<T>,
  deps: unknown[] = [],
): PropertiesReturnOptions<T> => {
  const { ref, ...map } = options
  const elementRef = useElement(ref, document.body)
  const [result, setResult] = useState(() => getProperties(elementRef, map))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => setResult(getProperties(elementRef, map)), deps)

  return result as PropertiesReturnOptions<T>
}

export default useProperties
