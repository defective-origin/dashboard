import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type NestedStateEvent<V, S, C> = (value: V, store: S | V, context?: C) => void
export type NestedStateSelector<V, S, E, C, R = any> = (value: V, store: S | V, node: NestedState<V, S, E, C>) => R

// TODO: Может дженерики удалить?)
/** One way node of tree. */
export type NestedState<V, S, E, C> = {
  /** State name. */
  name: string

  /** Current state value. */
  value: V

  /** Initial state value. */
  init: V

  // /** Value before formatting. */
  // rowValue: unknown

  // TODO: unformatted value before formatting

  /** Path to state. */
  path: string[]

  // TODO: может сразу ошибки считать?(
  /** Should return validation errors. */
  isValidated: boolean

  /** State subscriptions. */
  subscriptions: number

  /** Sub nodes. */
  nested: Record<string, NestedState<V, S, E, C>>

  /** Format value before save. */
  formatter: NestedStateSelector<V, S, E, C>

  /** Validate value and return errors.  */
  validator?: NestedStateSelector<V, S, E, C>

  /** Change event is called when current state is changed. */
  onChange?: NestedStateEvent<V, S, C>

  /** Change event is called before current state is changed. */
  onReset?: NestedStateEvent<V, S, C>
}

const initNode = <V, S, E, C>(
  name = 'state',
  parent?: NestedState<V, S, E, C> | null,
  options: Partial<NestedState<V, S, E, C>> = {},
): NestedState<V, S, E, C> => ({
    ...options,
    name,
    init: options.value as V,
    value: structuredClone(options.value) as V,
    nested: {},
    subscriptions: 0,
    isValidated: false,
    path: [...parent?.path ?? [], name],
    // TODO: add default validator
    formatter: options.formatter ?? ((value, _, node) => {
      // update node values if current node is array container
      const nodes = Object.values(node.nested)
      if (Array.isArray(node.value)) {
        return nodes
          .filter((node) => ![void 0, null].includes(node.value as null))
          .map((node) => node.value) as V

      // update node values if current node is object container
      } else if (typeof node.value === 'object') {
        return Object.fromEntries(nodes.map((node) => [node.name, node.value])) as V
      }

      return value
    }),
  })

export type NestedStateHandlers<V, S, E, C> = {
  /** Get root value. */
  root: () => S | V

  /** Get value. Return parent value if name is not provided. */
  get: () => V

  /** Update value. */
  set: (value: V, context?: C) => void

  /** Validate state and it's nested states. */
  validate: (isOn?: boolean, context?: C) => void

  /** Return errors if state validated. */
  errors: () => E | any

  /** Reset state value and it's nested states. */
  reset: (context?: C) => void

  /** Refresh only root node and refresh all nested components. */
  refresh: (withOnChange?: boolean, context?: C) => void

  /** Add nested node. */
  attach: (name: string, node: NestedState<V, S, E, C>) => void

  /** Remove nested node. */
  detach: (name: string) => void
}

// TODO: refresh only states which have prop deps? example deps: [()=> store.field1]
// TODO: add custom event to update state if need on store update and check only if field updated then reupdate field?

export type NestedStateOptions<V, S, E, C> = Partial<Omit<NestedState<V, S, E, C>, 'init' | 'errors' | 'path' | 'nested' | 'subscriptions' | 'parent'>> & {
  /** Custom context for getting parent states. NestedStateContext is used by default.  */
  context?: React.Context<NestedStateReturnOptions<V, S, E, C> | null>
}

export type NestedStateReturnOptions<V = any, S = any, E = any, C = any> = NestedStateHandlers<V, S, E, C> & {
  node: NestedState<V, S, E, C>
}

export const NestedStateContext = React.createContext<NestedStateReturnOptions | null>(null)
NestedStateContext.displayName = 'NestedStateContext'

/**
 * Creates Store with nested object states.
 * Allows create dynamic sub states.
 *
 * @example
 * const state = useNestedState(conf)
 */
export const useNestedState = <V, S, E, C>(options: NestedStateOptions<V, S, E, C> = {}): NestedStateReturnOptions<V, S, E, C> => {
  const { name = '', context = NestedStateContext, ...nodeOptions } = options
  const parent = useContext(context as React.Context<NestedStateReturnOptions<V, S, E, C> | null>)
  const [isInitialized, setIsInitialized] = useState(false)
  const [refreshTime, setRefreshTime] = useState(0)
  const node = useMemo(() => {
    // if current node is proxy for parent node
    if (parent && !name) {
      return parent.node

    // if state already exists in parent node
    } else if (parent && parent.node.nested[name]) {
      return parent.node.nested[name]
    }

    // if current node is root or not exist
    return initNode<V, S, E, C>(name, parent?.node, nodeOptions)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mutateTree = useCallback((
    node: NestedState<V, S, E, C>,
    mutator: (node: NestedState<V, S, E, C>) => void,
  ) => {
    for (const item of Object.values(node.nested)) {
      mutateTree(item, mutator)
    }

    mutator(node)
  }, [])

  const get = useCallback<NestedStateHandlers<V, S, E, C>['get']>(
    () => node.value,
    [node],
  )

  const root = useCallback<NestedStateHandlers<V, S, E, C>['root']>(
    () => parent?.root() ?? get(),
    [get, parent],
  )

  const errors = useCallback<NestedStateHandlers<V, S, E, C>['errors']>(() =>
    node.isValidated ? node.validator?.(node.value, root(), node) : undefined
  , [node, root])

  const refresh = useCallback<NestedStateHandlers<V, S, E, C>['refresh']>((withChangeEvent, context) => {
    node.value = node.formatter(node.value, root(), node)

    if (withChangeEvent) {
      node.onChange?.(node.value, root(), context)
    }

    // update paren value
    if (parent) {
      parent.refresh(withChangeEvent, context)

    // refresh only when app initialized
    // and only root node to prevent extra rerenders
    } else if (isInitialized) {
      setRefreshTime(new Date().getTime())
    }
  }, [node, parent, isInitialized, root])

  const set = useCallback<NestedStateHandlers<V, S, E, C>['set']>((value, context) => {
    node.value = value

    refresh(true, context)
  }, [node, refresh])

  const validate = useCallback<NestedStateHandlers<V, S, E, C>['validate']>((isOn = true, context) => {
    mutateTree(node, (item) => item.isValidated = isOn)

    refresh(true, context)
  }, [mutateTree, node, refresh])

  const reset = useCallback<NestedStateHandlers<V, S, E, C>['reset']>((context) => {
    node.onReset?.(get(), root(), context)

    mutateTree(node,(item) => {
      item.value = structuredClone(item.init)
      item.isValidated = false
    })

    refresh(true, context)
  }, [node, get, root, mutateTree, refresh])

  const attach = useCallback<NestedStateHandlers<V, S, E, C>['attach']>((name, state) => {
    if (!node.nested[name]) {
      node.nested[name] = state

      refresh()
    }

    node.nested[name].subscriptions += 1
  }, [node.nested, refresh])

  const detach = useCallback<NestedStateHandlers<V, S, E, C>['detach']>((name) => {
    node.nested[name].subscriptions -= 1

    if (!node.nested[name].subscriptions) {
      delete node.nested[name]

      refresh()
    }
  }, [node.nested, refresh])

  // Attach/Detach node in parent node on component mount/unmount.
  useEffect(() => {
    // prevent rerenders on initialization step
    setIsInitialized(true)

    // attach only named nodes
    // otherwise this is proxy state
    if (name) {
      parent?.attach(name, node)

      return () => parent?.detach(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useMemo<NestedStateReturnOptions<V, S, E, C>>(
    () => ({ node, root, attach, detach, get, set, validate, errors, reset, refresh }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshTime, node, root, attach, detach, get, set, validate, errors, reset, refresh],
  )
}

export default useNestedState
