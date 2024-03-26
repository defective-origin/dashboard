import { useCallback } from 'react'

export type PropertyOptions = {
  defaultValue?: string
  defaultProperty?: string

  /** By default document.body will be used */
  ref?: React.MutableRefObject<Element>
}

export type PropertyReturnOptions = (property?: string, defaultValue?: string) => string | undefined

/**
 * Allow create property getter
 * Approach allows to get css variables and other props [ex: for drawing in canvas]
 * https://stackoverflow.com/questions/71368314/can-i-set-a-canvas-fillstyle-with-a-variable-from-css
 *
 * @example
 * const property = useProperty()
 *
 * property('--primary-color', 'default value')
 *
 * // default can be configured
 * const property = useProperty({
 *    ref: elementRef.current, // body by default
 *    defaultValue: 'default value',
 *    defaultProperty: '--primary-color',
 * })
 *
 * property()
 */
export const useProperty = (options: PropertyOptions = {}, deps: unknown[] = []): PropertyReturnOptions => {
  const element = options.ref?.current ?? document.body

  return useCallback((property = options.defaultProperty, defaultValue = options.defaultValue) => {
    if (!property || !element) {
      return defaultValue
    }

    return getComputedStyle(element).getPropertyValue(property) || defaultValue
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, options.defaultValue, options.defaultProperty, ...deps])
}

export default useProperty
