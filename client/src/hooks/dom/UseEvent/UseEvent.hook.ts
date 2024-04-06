import { useEffect } from 'react'
import useElement, { ElementOptions, ElementReturnOptions } from '../UseElement'

export type EventOptions<E extends Element> = AddEventListenerOptions & {
  ref?: ElementOptions<E>
  /** If true then subscribe only once otherwise resubscribe on listener changes */
  single?: boolean
}

export type EventReturnOptions<E extends Element> = ElementReturnOptions<E>

/**
 * Add event listener to element.
 * Document is used as default element.
 *
 * @example
 * const state = useEvent('event', () => console.log('event'), options)
 */
export function useEvent<E extends Element, K extends keyof HTMLElementEventMap>(
  name: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
  options?: EventOptions<E>,
): EventReturnOptions<E>;
export function useEvent<E extends Element>(
  name: string,
  listener: EventListenerOrEventListenerObject,
  options: EventOptions<E> = {},
): EventReturnOptions<E> {
  const ref = useElement(options.ref, document as unknown as Element)

  useEffect(() => {
    const element = ref.current

    element?.addEventListener(name, listener, options)

    return () => element?.removeEventListener(name, listener, options)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.single ? undefined : listener, name, ref])

  return ref
}

export default useEvent
