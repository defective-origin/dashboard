import { useCallback, useRef } from 'react'

const ERROR_CALLBACK = () => { throw new Error('Callback cannot be called') }

type Func<A extends unknown[], R> = (...args: A) => R;

/**
 * Return stable function bound with ref.
 * Forget about dependencies and additional re-renders.
 * useCallback should be replaced by this hook in React library.
 *
 * @example
 * const fn = useFunc(() => { console.log() })
 */
export const useFunc = <A extends unknown[], R>(cb: Func<A, R>): Func<A, R> => {
  const ref = useRef<Func<A, R>>(ERROR_CALLBACK)

  ref.current = cb

  return useCallback((...args) => ref.current(...args), [])
}

export default useFunc
