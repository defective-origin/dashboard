import { useLayoutEffect, useRef } from 'react'

export const getNode = (elem?: ElementOptions<Element>, defaultElem?: ElementOptions<Element>): Element | null => {
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
  // Try to get element only from selector because
  // if default element has set we won't be able to change ref
  const ref = useRef<unknown>(getNode(element))

  // initialize value if element options was provided.
  // it wasn't provided in useRef immediate because
  // In this case it will not be able overwritten by react in
  // <div ref={ref} />
  useLayoutEffect(() => {
    const node = getNode(element, defaultElement)
    if (!ref.current && node) {
      ref.current = node
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref as ElementRef<E>
}

export default useElement
