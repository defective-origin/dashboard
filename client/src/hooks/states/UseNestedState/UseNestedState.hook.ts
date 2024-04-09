import React, { useContext, useMemo, useState } from 'react'
import { NestedStateNode, NestedStateNodeOptions } from './UseNestedState.tool'
import { useFunc } from '../UseFunc'

export type NestedStateOptions<V> = Partial<NestedStateNodeOptions<V>> & {
  /** Custom context for getting parent states. NestedStateContext is used by default.  */
  context?: React.Context<NestedStateReturnOptions<V> | null>
}

export type NestedStateReturnOptions<V = unknown> = {
  /** Current node. */
  node: NestedStateNode<V>

  /** Root node state. */
  root: NestedStateReturnOptions<V> | null

  /** Update value. */
  set: (value?: V) => void

  /** Validate state and it's nested states. */
  validate: () => void

  /** Reset state value and it's nested states. */
  reset: () => void

  /** Refresh node and refresh all nested components. */
  refresh: () => void

  /** Reformat container node. */
  format: () => void
}

export const NestedStateContext = React.createContext<NestedStateReturnOptions | null>(null)
NestedStateContext.displayName = 'NestedStateContext'

/**
 * Creates Store with nested object states.
 * Allows create dynamic sub states.
 * Component unmount doesn't remove state.
 *
 * @example
 * const state = useNestedState(options)
 */
export const useNestedState = <V>(options: NestedStateOptions<V> = {}): NestedStateReturnOptions<V> => {
  const { name = '', context = NestedStateContext, ...nodeOptions } = options
  const parent = useContext(context as React.Context<NestedStateReturnOptions<V> | null>)
  const [refreshTime, setRefreshTime] = useState(0)
  const root = parent?.root ?? parent
  const node = useMemo(() => {
    // if current node is proxy for parent node
    if (parent && !name) {
      return parent.node

    // if state already exists in parent node
    } else if (parent && parent.node.has(name)) {
      return parent.node.get(name)
    }

    // if current node is root or not exist
    return new NestedStateNode<V>(parent?.node, name, nodeOptions)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mutateTree = useFunc((
    node: NestedStateNode<V>,
    mutator: (node: NestedStateNode<V>) => void,
  ) => {
    for (const item of Object.values(node.nested)) {
      mutateTree(item, mutator)
    }

    mutator(node)
  })

  const refresh = useFunc(() => {
    if (root && (node.dependency || Object.keys(node.nested).length)) {
      root?.refresh()
    } else {
      setRefreshTime(new Date().getTime())
    }
  })

  const format = useFunc(() => {
    node.format()
    node.onChange?.(node.value)
    parent?.format()
  })

  const set = useFunc((value?: V) => {
    node.set(value)
    node.onChange?.(value)
    parent?.format()
    refresh()
  })

  const reset = useFunc(() => {
    mutateTree(node, (item) => item.reset())
    node.onChange?.(node.value)
    parent?.format()
    refresh()
  })

  const validate = useFunc(() => {
    mutateTree(node, (item) => item.validate())
    refresh()
  })

  return useMemo<NestedStateReturnOptions<V>>(
    () => ({ refreshTime, node, root, format, set, validate, reset, refresh }),
    [refreshTime, node, root, format, set, validate, reset, refresh],
  )
}

export default useNestedState
