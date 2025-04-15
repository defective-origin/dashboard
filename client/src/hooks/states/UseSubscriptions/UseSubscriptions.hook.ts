import { useCallback, useMemo, useRef } from 'react'

export type SubscriptionEvent = (...args: any[]) => void

// TODO: rewrite on browser events
export type SubscriptionsManager<
  K extends string = string,
  C extends SubscriptionEvent = SubscriptionEvent,
> = {
  /** add subscription by name */
  on: (name: K, cb: C) => void
  /** remove subscription by name */
  off: (name: K, cb: C) => void
  /** emit subscriptions by name */
  emit: (name: K, ...args: Parameters<C>) => void
  /** return registered subscription names or names which include part of name */
  names: (name?: string) => string[]
}

/**
 * Hook descriptions
 *
 * @example
 * const state = useSubscriptions(options)
 *
 * // work with events
 * obj.on('a.b.c', (...args) => console.log(...args))
 * obj.emit('a.b.c', 1, 2, 3)
 * obj.off('a.b.c', (...args) => console.log(...args))
 *
 * // get all names
 * obj.names()
 * // get all names which includes name
 * obj.names('a.b')
 */
export const useSubscriptions = <
K extends string = string,
C extends SubscriptionEvent = SubscriptionEvent,
>(): SubscriptionsManager<K, C> => {
  const subscriptions = useRef({} as Record<K, Set<C>>)

  const names = useCallback<SubscriptionsManager<K, C>['names']>((name) => {
    if (name) {
      return Object.keys(subscriptions.current).filter((key) => key.includes(name))
    }

    return Object.keys(subscriptions.current)
  }, [])

  const on = useCallback<SubscriptionsManager<K, C>['on']>((name, cb) => {
    if (!subscriptions.current[name]) {
      subscriptions.current[name] = new Set<C>()
    }

    subscriptions.current[name].add(cb)
  }, [subscriptions])

  const off = useCallback<SubscriptionsManager<K, C>['off']>((name, cb) => {
    if (subscriptions.current[name]) {
      subscriptions.current[name].delete(cb)
    }
  }, [subscriptions])

  const emit = useCallback<SubscriptionsManager<K, C>['emit']>((name, ...args) => {
    for (const cb of subscriptions.current[name] ?? []) {
      cb(...args)
    }
  }, [subscriptions])

  return useMemo<SubscriptionsManager<K, C>>(() => ({ on, off, emit, names }), [on, off, emit, names])
}

export default useSubscriptions
