import { useEffect, useRef } from 'react'

export type ModeOption = undefined | string
export type ModeOptions = (ModeOption | ModeOption[])[]

export type ModeReturnOptions = void

/**
 * Add class names to body
 *
 * @example
 * const options = useMode(conf)
 */
export const useMode = (...args: ModeOptions): ModeReturnOptions => {
  const prevRef = useRef<string[]>([])
  const value = args.flat().filter(Boolean) as string[]

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
