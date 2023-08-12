import { useCallback } from 'react'

export type UsePropertyOptions = {
  defaultValue?: string
  defaultProperty?: string

  /** By default document.body will be used */
  ref?: React.MutableRefObject<Element>
}

export type UsePropertyReturnOptions = (property?: string) => string | undefined

/**
 * Allow create property getter
 * Approach allows to get css variables and other props [ex: for drawing in canvas]
 * https://stackoverflow.com/questions/71368314/can-i-set-a-canvas-fillstyle-with-a-variable-from-css
 *
 * @example
 * const options = useProperty(conf)
 */
export const useProperty = (options: UsePropertyOptions = {}): UsePropertyReturnOptions => {
  const element = options.ref?.current ?? document.body

  return useCallback((property = options.defaultProperty) => {
    if (!property || !element) {
      return options.defaultValue
    }

    return getComputedStyle(element).getPropertyValue(property) || options.defaultValue
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, options.defaultValue, options.defaultProperty])
}

export default useProperty
