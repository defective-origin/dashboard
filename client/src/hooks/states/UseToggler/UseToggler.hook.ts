import { useMemo, useState } from 'react'
import useFunc from '../UseFunc'

export type TogglerOptions = {
  onOn?: () => void
  onOff?: () => void
}

export type TogglerReturnOptions = {
  isOn: boolean
  isOff: boolean
  on: () => void
  off: () => void
  toggle: () => void
  turn: (flag: unknown) => void
}

/**
 * Allows to work with boolean flag
 * @example
 * const state = useToggler(options)
 */
export function useToggler(value?: unknown, options: TogglerOptions = {}): TogglerReturnOptions {
  const flag = !!value
  const [isOn, setIsOn] = useState(flag)
  const [prevFlag, setPrevOptions] = useState(flag)

  const on = useFunc(() => {
    setIsOn(true)
    options.onOn?.()
  })
  const off = useFunc(() =>{
    setIsOn(false)
    options.onOff?.()
  })
  const toggle = useFunc(() => isOn ? off() : on())
  const turn = useFunc((flag: unknown) => flag ? on() : off())

  if (flag !== prevFlag) {
    setPrevOptions(flag)
    turn(flag)
  }

  return useMemo(() => ({
    isOn,
    isOff: !isOn,
    toggle,
    on,
    off,
    turn,
  }), [isOn, off, on, toggle, turn])
}

export default useToggler
