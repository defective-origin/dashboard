import { useEffect } from 'react'
import { useStateful } from '../states'

export type EventOption = AddEventListenerOptions & { element?: HTMLElement }

/**
 * Allows to add event listener for element.
 *
 * @example
 * useEvent('click', () => console.log('click'))
 * useEvent('mouseover', () => console.log('mouseover'))
 */
export const useEvent = (
  eventName: string,
  handler?: EventListenerOrEventListenerObject,
  options: EventOption = {},
): void => {
  const { capture, passive, once, element = global } = options
  const handlerRef = useStateful(handler, [handler])

  useEffect(() => {
    const eventListener = handlerRef.current
    const isSupported = element && element.addEventListener
    if (!isSupported || !eventListener) {
      return () => null
    }

    const opts = { capture, passive, once }
    element.addEventListener(eventName, eventListener, opts)

    return () => {
      element.removeEventListener(eventName, eventListener, opts)
    }
  }, [eventName, element, capture, passive, once, handlerRef])
}

export default useEvent
