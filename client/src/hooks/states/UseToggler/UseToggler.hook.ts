import { Dispatch, SetStateAction, useCallback, useLayoutEffect, useState } from 'react'

export type TogglerOptions = unknown

export type TogglerReturnOptions = {
  isOn: boolean;
  isOff: boolean;
  on: () => void;
  off: () => void;
  toggle: () => void;
  turn: Dispatch<SetStateAction<boolean>>;
}

/**
 * Allows to work with boolean flag
 *
 * @example
 * const state = useToggler(options)
 */
export const useToggler = (options?: TogglerOptions): TogglerReturnOptions => {
  const [isOn, turn] = useState(!!options)
  const toggle = useCallback(() => turn((flag) => !flag), [])
  const on = useCallback(() => turn(true), [])
  const off = useCallback(() => turn(false), [])

  useLayoutEffect(() => turn(!!options), [options])

  return {
    isOn,
    isOff: !isOn,
    toggle,
    on,
    off,
    turn,
  }
}

export default useToggler
