import { useEffect, useRef } from 'react'

export type UseModeOptions = (string | string[])[]

export type UseModeReturnOptions = void

/**
 * Add class names to body
 *
 * @example
 * const options = useMode(conf)
 */
export const useMode = (...args: UseModeOptions): UseModeReturnOptions => {
  const prevRef = useRef<string[]>([])
  const value = args.flat().filter(Boolean)

  useEffect(() => {
    const prevValue = prevRef.current
    prevRef.current = value

    document.body.classList.remove(...prevValue)
    document.body.classList.add(...value)

    return () => document.body.classList.remove(...prevValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.toString()])
}

export default useMode
