import { DependencyList, Dispatch, SetStateAction, useEffect, useState } from 'react'

/**
 * Hook descriptions
 *
 * @example
 * const state = useSubscribedState(dynamicValue)
 * const state = useSubscribedState(5, [dep1, dep2])
 */
export const useSubscribedState = <S = undefined>(value: S,deps: DependencyList = []): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(value)
  const [prevValue, setPrevValue] = useState<S>(value)

  // Synchronized state right during rendering if the value has changed
  // Pattern "State synchronization during rendering"
  if (value !== prevValue) {
    setPrevValue(value)
    setState(value)
  }

  // We leave the effect only for tracking additional deps, if they are needed
  useEffect(() => { setState(value) }, deps)

  return [state, setState]
}

export default useSubscribedState
