/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState, SetStateAction, MutableRefObject, useMemo, useLayoutEffect } from 'react'

export const getValue = <S>(arg: SetStateAction<S>, prevState: S) => {
  if (typeof arg === 'function') {
    return (arg as any)(prevState)
  }

  return arg
}

export type StatefulReturnOptions<S> = MutableRefObject<S> & {
  unstable: S
  change: (val: SetStateAction<S>) => void
  changeSilent: (val: SetStateAction<S>) => void
  reset: () => void
  sync: () => void
}

/**
 * Allows to save value and change it without rerender.
 *
 * @example
 * const state = useStateful(someValue)
 * const state = useStateful(someValue, someValue) // subscribe on deps changes
 *
 * // change with rerendering
 * state.change(newValue)
 * state.change((prevValue) => prevValue + newValue)
 *
 * // change initial value with ref reinitialization if changes deps changes
 * state.change(newValue, [newValue])
 *
 * // change only ref value
 * state.changeSilent(newValue)
 * state.changeSilent((prevValue) => prevValue + newValue)
 *
 * // reset ref value with state value
 * state.sync()
 *
 * // reset value
 * state.reset()
 *
 * // get last valid value
 * state.current
 *
 * // get registered state
 * state.value
 */
export const useStateful = <S>(initial: S, deps: unknown[] = []): StatefulReturnOptions<S> => {
  // it exists for component rerendering and can have old value
  const [unstableValue, setUnstableValue] = useState<S>(initial)
  const ref = useRef<S>(initial) as StatefulReturnOptions<S>

  ref.unstable = unstableValue

  useMemo(() => {
    ref.sync = () => ref.change(ref.current)
    ref.changeSilent = (val) => { ref.current = getValue(val, ref.current) }
    ref.change = (val) => {
      ref.changeSilent(val)

      setUnstableValue(getValue(val, ref.current))
    }
  }, [ref, setUnstableValue])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  ref.reset = useCallback(() => ref.change(initial), [ref, ...deps])

  // In a real implementation, this would run before layout effects
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => ref.changeSilent(initial), [ref, ...deps])

  return ref
}

export default useStateful
