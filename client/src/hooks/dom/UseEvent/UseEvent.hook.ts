import { useEffect } from 'react'
import useElement, { ElementOptions, ElementRef } from '../UseElement'
import useFunc from '../../states/UseFunc'

export type EventOptions<E extends Element> = AddEventListenerOptions & {
  ref?: ElementOptions<E>
}

export type EventReturnOptions<E extends Element> = ElementRef<E>

/**
 * Add event listener to element.
 * Document body is used as default element.
 *
 * @example
 * const state = useEvent('event', () => console.log('event'), options)
 */
export function useEvent<E extends HTMLElement, K extends keyof HTMLElementEventMap>(
  name: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
  options?: EventOptions<E>,
): EventReturnOptions<E> {
  const ref = useElement(options?.ref, document.body)
  const func = useFunc(listener)

  useEffect(() => {
    const element = ref.current

    element?.addEventListener(name, func, options)

    return () => element?.removeEventListener(name, func, options)
  }, [func, name, options, ref])

  return ref
}

export default useEvent