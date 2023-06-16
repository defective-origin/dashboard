/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'

// ---| common |---
import { TailParameters } from 'common/models/function.model'

type BaseHookWithRef<
  TElement extends Element = HTMLElement,
  TResult = any,
> = (ref: React.MutableRefObject<TElement | null>, ...args: any[]) => TResult

/**
 * Build hook without ref.
 * @example
 * function useScrollWithoutRef(ref, settings) {
 *  // some code
 *  return options
 * }
 *
 * const useHook = buildHookWithoutRef(useScrollWithoutRef)
 * const [ref, options] = useHook(settings)
 */
export function buildHookWithoutRef<THook extends BaseHookWithRef>(useBaseHook: THook) {
  return function useHookWithoutRef<TElement extends Element>(
    ...args: TailParameters<THook>
  ): [React.MutableRefObject<TElement | null>, ReturnType<THook>] {
    const ref = useRef(null)
    const options = useBaseHook(ref, ...args)

    return [ref, options]
  }
}

/**
 * Build hook with optional ref.
 * @example
 * function useScrollWithoutRef(ref, settings) {
 *  // some code
 *  return options
 * }
 *
 * // without ref
 * const useHook = buildHookWithOptionalRef(useScrollWithoutRef)
 * const [ref, options] = useHook<HTMLElement>()
 *
 * // with ref
 * const ref = useRef<HTMLElement>(null)
 * const options = useHook(ref)
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function buildHookWithOptionalRef<THook extends BaseHookWithRef>(useBaseHook: THook) {
  function useHookWithOptionalRef(...args: Parameters<THook>): ReturnType<THook>
  function useHookWithOptionalRef<TElement extends Element>(
    ...args: TailParameters<THook>
  ): [React.MutableRefObject<TElement | null>, ReturnType<THook>]
  function useHookWithOptionalRef(
    ...args: any[]
  ) {
    const ref = useRef(null)
    const firstArgument = args[0]
    const isRefPassed = typeof firstArgument === 'object' && 'current' in firstArgument
    const currentRef = isRefPassed ? firstArgument : ref
    const options: ReturnType<THook> = useBaseHook(currentRef, ...args)

    if (isRefPassed) {
      return options
    }

    return [ref, options]
  }

  return useHookWithOptionalRef
}

export default buildHookWithoutRef
