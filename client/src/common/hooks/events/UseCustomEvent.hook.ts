import { useCallback } from 'react'
import useEvent from './UseEvent.hook'

export type CustomEventFunc<T> = (detail?: T) => void

/**
 * Allows to create custom event listener for element. And get emitter for it.
 *
 * @example
 * const emit = useCustomEvent('custom', (value) => console.log('custom', value))
 * 
 * emit(value)
 */
export const useCustomEvent = <T>(
  type: string,
  handler?: CustomEventFunc<T>,
  options: CustomEventInit<T> = {}
  ): CustomEventFunc<T> => {
  const publish = useCallback((detail = options.detail) => {
    document.dispatchEvent(new CustomEvent<T>(type, { ...options, detail }))
  }, [type])

  useEvent(type, handler && ((e: Event) => handler?.((e as CustomEvent<T>).detail)))

  return publish
}

export default useCustomEvent
