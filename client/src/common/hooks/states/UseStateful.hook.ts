import { useCallback, useLayoutEffect, useRef, useState, SetStateAction, MutableRefObject } from 'react'

export const getValue = <S>(arg: SetStateAction<S>, prevState: S) => {
  if (typeof arg === 'function') {
    return (arg as any)(prevState)
  }

  return arg
}

export type StatefulReturnOptions<S> = MutableRefObject<S> & {
  value: S
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
  const [value, setValue] = useState<S>(initial)
  const ref = useRef<S>(initial) as StatefulReturnOptions<S>

  useLayoutEffect(() => {
    ref.change = (val) => {
      ref.changeSilent(val)

      setValue(getValue(val, ref.current))
    }
    ref.changeSilent = (val) => { ref.current = getValue(val, ref.current) }
    ref.sync = () => ref.change(ref.current)
  }, [ref, setValue])

  ref.reset = useCallback(() => ref.change(initial), [ref.change, ...deps])
  ref.value = value

  // In a real implementation, this would run before layout effects
  useLayoutEffect(() => ref.changeSilent(initial), [ref, ...deps])

  return ref
}

export default useStateful
