import { useCallback, useRef } from 'react'

const ERROR_CALLBACK = () => { throw new Error('Callback cannot be called') }

// TODO: rename to useAction
/**
 * Return stable function bound with ref.
 * It can be useful for events and handlers.
 *
 * @example
 * const [current, setCurrent] = useState(1) // getter
 * const fn = useFunc(() => setCurrent(current + 1))
 *
 * <MemoizedComponent onScroll={fn} />
 *
 * // if you use Memoized components and getter function then use useCallback
 * // this doesn't rerender component
 * const [current, setCurrent] = useState(1) // getter
 * const fn = useFunc(() => current)
 *
 * <MemoizedComponent fn={fn} />
 *
 * // this works fine
 * const [current, setCurrent] = useState(1) // getter
 * const fn = useCallback(() => current, [current])
 *
 * <MemoizedComponent fn={fn} />
 *
 *
 * // if you have some state deps in useEffect and useMemo
 * // this doesn't rerender hooks
 * const [current, setCurrent] = useState(1) // getter
 * const fn = useFunc(() => current)
 * const value = useMemo(() => fn() + 1, [fn]) // it doesn't work
 *
 * useEffect(() => fetch().then(fn), [fn]) // it doesn't work
 *
 * // this works fine
 * const [current, setCurrent] = useState(1)
 * const fn = useCallback(() => current, [current]) // getter
 * const value = useMemo(() => fn() + 1, [fn]) // it works fine
 *
 * useEffect(() => fetch().then(fn), [fn]) // it works fine
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const useFunc = <F extends Function>(cb: F): F => {
  const ref = useRef<F>(ERROR_CALLBACK as never)

  ref.current = cb

  return useCallback((...args: unknown[]) => ref.current(...args), []) as never
}

export default useFunc
