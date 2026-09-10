import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

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
  const flag = !!options
  const [isOn, turn] = useState(flag)
  const [prevFlag, setPrevOptions] = useState(flag)

  const toggle = useCallback(() => turn(flag => !flag), [])
  const on = useCallback(() => turn(true), [])
  const off = useCallback(() => turn(false), [])

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
  }), [isOn, off, on, toggle])
}

export default useToggler
