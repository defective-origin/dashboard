import { useRef } from 'react'


/**
 * Allows to use ref as state without rerendering and other ref overriding
 * @example
 * const stateRef = useRefState(options)
 * stateRef.current === options
 */
export function useRefState<V>(value: V) {
  const ref = useRef<V>(value)

  // eslint-disable-next-line react-hooks/refs
  ref.current = value

  return ref
}

export default useRefState
