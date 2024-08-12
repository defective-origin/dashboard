import { useEffect } from 'react'
import useElement, { ElementOptions, ElementRef } from '../UseElement'
import useFunc from '../../states/UseFunc'

export type ExtendedEventMap = HTMLElementEventMap & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  [customEventName: string & {}]: CustomEvent<any>;
}

export type EventOptions<E extends Element> = AddEventListenerOptions & {
  ref?: ElementOptions<E>
  disable?: boolean
  deps?: unknown[]
}

export type EventReturnOptions<E extends Element> = ElementRef<E>

/**
 * Add event listener to element.
 * Document body is used as default element.
 *
 * @example
 * const state = useEvent('event', () => console.log('event'), { direction: 'y', ref: elementRef, ...eventOptions })
 */
export function useEvent<E extends HTMLElement, K extends keyof ExtendedEventMap>(
  name: K,
  listener: (this: HTMLElement, event: ExtendedEventMap[K]) => unknown,
  options?: EventOptions<E>,
): EventReturnOptions<E> {
  const ref = useElement(options?.ref, document.body)
  const func = useFunc(listener)

  useEffect(() => {
    if (!options?.disable) {
      const element = ref.current

      element?.addEventListener(name, func as EventListener, options)

      return () => element?.removeEventListener(name, func as EventListener, options)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [func, name, options?.disable, ref, ...options?.deps ?? []])

  return ref
}

export default useEvent
