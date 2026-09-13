import { useEffect } from 'react'
import { react } from 'tools'
import useFunc from '../../states/UseFunc'

export type EventKey = string | (string | number | undefined | null)[]
export const initEventName = (keys: EventKey) => Array.isArray(keys) ? keys.join(':') : keys

export type ExtendedEventMap = HTMLElementEventMap & {
  [customEventName: string & {}]: CustomEvent<any>
}

export type EventOptions<E extends Element> = AddEventListenerOptions & {
  ref?: react.ElementSelector<E>
  disable?: boolean
  deps?: unknown[]
}


/**
 * Add event listener to element.
 * Document body is used as default element.
 * @example
 * const state = useEvent('event', () => console.log('event'), { direction: 'y', ref: elementRef, ...eventOptions })
 */
export function useEvent<E extends HTMLElement, K extends keyof ExtendedEventMap>(
  keys: EventKey | K,
  listener: (this: HTMLElement, event: ExtendedEventMap[K]) => unknown,
  options?: EventOptions<E>,
) {
  const func = useFunc(listener)
  const name = initEventName(keys)

  useEffect(() => {
    if (!options?.disable) {
      const elem = react.getElement(options?.ref, document.body)
      elem?.addEventListener(name, func as EventListener, options)

      return () => elem?.removeEventListener(name, func as EventListener, options)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [func, name, options?.disable, ...options?.deps ?? []])
}

export default useEvent


export const emitEvent = <D extends Record<string, any>>(keys: EventKey, detail?: D) => {
  document.body.dispatchEvent(new CustomEvent<D>(initEventName(keys), { detail }))
}

