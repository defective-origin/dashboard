import { useLayoutEffect, useRef } from 'react'

export const getElement = (elem?: ElementOptions<Element>, defaultElem?: ElementOptions<Element>): Element | null | undefined => {
  const element = elem ?? defaultElem

  // if ref object
  if (element && 'current' in element) {
    return element.current ?? null

  // if getter function
  } else if (typeof element === 'function') {
    return element() ?? null
  }

  // if element, null or undefined
  return element ?? null
}

export type ElementOptions<E extends Element> = React.MutableRefObject<E | null | undefined> | (() => E | null | undefined) | E | undefined | null

export type ElementRef<E extends Element> = React.MutableRefObject<E | null>

/**
 * Return element ref.
 *
 * @example
 * const elementRef = useElement(element, defaultElement)
 */
export const useElement = <E extends Element>(
  element: ElementOptions<E> = null,
  defaultElement: ElementOptions<Element> = null,
): ElementRef<E> => {
  const ref = useRef<unknown>(getElement(element, defaultElement))

  // initialize value if element options was provided.
  // it wasn't provided in useRef immediate because
  // In this case it wasn't overwrite by react in
  // <div ref={ref} />
  useLayoutEffect(() => {
    const elem = getElement(element, defaultElement)
    if (!ref.current && elem) {
      ref.current = elem
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref as ElementRef<E>
}

export default useElement
