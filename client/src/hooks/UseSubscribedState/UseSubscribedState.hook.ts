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

  useEffect(() => {
    if (value !== state) {
      setState(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])

  return [state, setState]
}

export default useSubscribedState
