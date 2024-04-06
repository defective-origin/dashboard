import { useLayoutEffect, useRef } from 'react'

export const getElement = (element?: ElementOptions<Element>): Element | null | undefined => {
  // if ref object
  if (element && 'current' in element) {
    return element.current

  // if getter function
  } else if (typeof element === 'function') {
    return element()
  }

  // if element, null or undefined
  return element
}

export type ElementOptions<E extends Element> = React.MutableRefObject<E | null | undefined> | (() => E | null | undefined) | E | undefined | null

export type ElementReturnOptions<E extends Element> = React.MutableRefObject<E | null>

/**
 * Return element ref.
 *
 * @example
 * const elementRef = useElement(element, defaultElement)
 */
export const useElement = <E extends Element>(
  element: ElementOptions<E> = null,
  defaultElement: ElementOptions<Element> = null,
): ElementReturnOptions<E> => {
  const ref = useRef<E>(null)

  // initialize value if element options was provided.
  // it wasn't provided in useRef immediate because
  // In this case it wasn't overwrite by react in
  // <div ref={ref} />
  useLayoutEffect(() => {
    if (!ref.current) {
      const current = getElement(element) ?? getElement(defaultElement) ?? null

      Object.assign(ref, { current })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref as React.MutableRefObject<E>
}

export default useElement
