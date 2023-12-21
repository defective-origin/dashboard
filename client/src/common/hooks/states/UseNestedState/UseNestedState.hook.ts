import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const PATH_SEPARATOR = '.'
const toKey = (...args: string[]) => args.filter(Boolean).join(PATH_SEPARATOR)
const toPath = (key: string) => key.split(PATH_SEPARATOR)

export type NestedStateEventHandler<V, C> = (value: V, store: V, context?: C) => void

export type State<V> = {
  /** State name. */
  name: string

  /** Serialized initial state value. */
  init: V,

  /** Serialized state value. */
  value: V,

  /** State value errors if schema is provided. */
  errors: string[]

  /** Count of subscribers */
  count: number

  /** Nesting path */
  path: string[]

  /** Nesting path key */
  key: string

  // FIXME: add type: group | leaf or check nested?
}

export type States<V> = Record<string, State<V>>

export type NestedStateOptions<V, C> = {
  /** State map by path */
  _states: React.MutableRefObject<States<V>>

  /**
   * Validate state with provided schema and add errors to state.
   * Return true if state is valid otherwise false.
   */
  validate: () => boolean

  /** Set new state or return state by name. By default return root state. */
  store: (name?: string, state?: State<V>) => State<V>

  /** Return current state. */
  state: () => State<V>

  /** Update current state value. */
  set: (value: V, context?: C) => void

  /** Reset the current state value and it's nested states */
  reset: (context?: C) => void

  /** Recalculate state value. */
  refresh: (context?: C) => void
}

// FIXME: validateOnInit flag
// FIXME: validateOnChange flag
export type UseNestedStateOptions<V, C> = Pick<Partial<State<V>>, 'name' | 'init' | 'value'> & {
  /** If true state will be reinitialized if it's exist */
  refreshIfExist?: boolean

  /** Custom context for getting parent states. NestedStateContext is used by default.  */
  context?: React.Context<UseNestedStateReturnOptions<V, C> | null>

  // FIXME: Add default init structure for type checking of whole form/stick to value keys (only for form?)
  /** Strick structure mode. It allows create only known sub states and types.  */
  schema?: Record<string, any> // FIXME: если так проверять оишбки то зачем форма если Zod использовать можно
  // FIXME: validate/cast

  /** Convert state to json value */
  serialize?: (states: Record<string, V>, current: V, root: V, context?: C) => V // FIXME: remove serialize from props?

  /** Change event is called when current state is changed */
  onChange?: NestedStateEventHandler<V, C>

  /** Reset event is called before current state is reset */
  onReset?: NestedStateEventHandler<V, C>
  // FIXME: add event handler on store change line onStoreChange?
}

export type UseNestedStateReturnOptions<V, C> = NestedStateOptions<V, C>

export const NestedStateContext = React.createContext<UseNestedStateReturnOptions<unknown, unknown> | null>(null)
NestedStateContext.displayName = 'NestedStateContext'


/**
 * Creates Store with nested object states.
 * Allows create dynamic sub states.
 *
 * @example
 * const state = useNestedState(conf)
 */
export const useNestedState = <V = unknown, C = unknown>(options: UseNestedStateOptions<V, C> = {}): UseNestedStateReturnOptions<V, C> => {
  const {
    name = '',
    value,
    init = value,
    schema,
    refreshIfExist,
    context = NestedStateContext as React.Context<UseNestedStateReturnOptions<V, C> | null>,
    onChange,
    onReset,
    // serialize = (states, current) => typeof current === 'object' ? states : current,
    serialize = (states, current) => {
      if (typeof current === 'object') {
        return Object.keys(states)
          .filter((key) => states[key] !== undefined)
          .reduce((acc, key, idx) => Object.assign(acc, { [Array.isArray(current) ? idx : key]: states[key] }), Array.isArray(current) ? [] : {})
      }

      return current
    },
  } = options
  const [isInitialized, setIsInitialized] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(false)
  const container = useContext(context)
  const _states = useRef<States<V>>(container?._states.current ?? {})

  // if name is not passed then current state will proxy operations to parent state
  const stateKey = useMemo(() => toKey(container?.state().key ?? '', name) ?? 'root', [container, name])
  const statePath = useMemo(() => toPath(stateKey), [stateKey])

  const store = useCallback<NestedStateOptions<V, C>['store']>((name = statePath[0], newState) => {
    if (newState) {
      return _states.current[name] = { ...newState }
    }

    // return state by name or root state if name is not passed
    return _states.current[name]
  }, [_states, statePath])

  const state = useCallback<NestedStateOptions<V, C>['state']>(() => store(stateKey), [stateKey, store])

  const getNestedStates = useCallback(({ deep = false } = {}) => {
    return Object.keys(_states.current)
      // select all nested states by tree except current state
      .filter((key) => key.startsWith(state().key) && key !== state().key)
      // select only child states or also deep nested states
      .filter((key) => deep || state().path.length + 1 === store(key).path.length)
      // get list of nested states
      .map((key) => store(key))
  }, [_states, state, store])

  const refresh = useCallback<NestedStateOptions<V, C>['refresh']>((context) => {
    const nestedStates = getNestedStates()
    const valueState = nestedStates.reduce((acc, state) => Object.assign(acc, { [state.name]: state.value }), {})
    const initState = nestedStates.reduce((acc, state) => Object.assign(acc, { [state.name]: state.init }), {})

    // refresh initial and current values
    Object.assign(state(), {
      value: serialize(valueState, state().value, store().value),
      init: serialize(initState, state().init, store().init),
    })

    onChange?.(state().value, store().value, context)

    // refresh parent container and call its events if container exist
    if (container) {
      container.refresh(context)

      // if we change flag from boolean to date setRefreshFlag(new Date().toString()), then performance is very low
      setRefreshFlag((flag) => !flag)
    // refresh store only if all sub elements were initialized and if it's root store state
    } else if (isInitialized) {
      setRefreshFlag((flag) => !flag)
    }
  }, [isInitialized, container, getNestedStates, onChange, serialize, state, store])

  const set = useCallback<NestedStateOptions<V, C>['set']>((value, context) => {
    Object.assign(state(), { value })

    refresh(context)
  }, [refresh, state])

  const reset = useCallback<NestedStateOptions<V, C>['reset']>((context) => {
    onReset?.(state().value, store().value, context)

    // reset all nested states
    getNestedStates({ deep: true }).forEach((s) => store(s.key, { ...s, value: s.init, errors: [] }))
    // FIXME: setIsValidated(false) or move to refresh with flags?
    refresh(context)
  }, [onReset, store, getNestedStates, refresh, state])

  const validate = useCallback<NestedStateOptions<V, C>['validate']>(() => {
    // // 'undefined'
    // // 'boolean'
    // // 'number'
    // // 'bigint'
    // // 'string'
    // // 'symbol'
    // // 'function'
    // // 'object' // fix null
    // // FIXME: save type in state?
    // // FIXME: allow create custom type like: type: 'my-custom-type'.
    return !schema // FIXME: implement
  }, [schema])

  // // Register state in store on component mount.
  // useLayoutEffect(() => {
  //   // save new nested state in store
  //   if (!state()) {
  //     store(stateKey, {
  //       name,
  //       init: init as V,
  //       value: value as V,
  //       count: 0,
  //       path: statePath,
  //       key: stateKey,
  //       errors: [],
  //     })

  //     // call value recalculation and event handling
  //     refresh()

  //   // update value if it's exists and refresh necessary
  //   } else if (refreshIfExist) {
  //     set(value as V)
  //   }

  //   console.log('called')

  //   // increase subscription counter
  //   state().count += 1

  //   // start refreshing state
  //   setIsInitialized(true)

  //   // Unregister state in store on component unmount.
  //   return () => {
  //     state().count -= 1

  //     // remove state from store if there is only one subscription
  //     if (!state().count) {// FIXME: save on unmount? // FIXME: create base nested structure on mount via schema
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       delete states.current[stateKey]
  //     }

  //     container?.refresh()
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  // save new nested state in store
  if (!state()) {
    store(stateKey, {
      name,
      init: init as V,
      value: value as V,
      count: 1,
      path: statePath,
      key: stateKey,
      errors: [],
    })

    // call value recalculation and event handling
    refresh()

    // update value if it's exists and refresh necessary
  } else if (!isInitialized && refreshIfExist) {
    set(value as V)

    // increase subscription counter
    state().count += 1
  }

  // Register state in store on component mount.
  useEffect(() => {

    // start refreshing state
    setIsInitialized(true)

    // Unregister state in store on component unmount.
    return () => {
      // state().count -= 1

      // // remove state from store if there is only one subscription
      // if (!state().count) {// FIXME: save on unmount? // FIXME: create base nested structure on mount via schema
      //   // eslint-disable-next-line react-hooks/exhaustive-deps
      //   delete states.current[stateKey]
      // }

      // container?.refresh()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log({ ...states.current })

  // FIXME: works even without refreshFlag
  // return useMemo<NestedStateOptions<V, C>>(() => ({ states, state, store, set, validate, reset, refresh }), [refreshFlag, state, store, set, validate, reset, refresh])
  return useMemo<NestedStateOptions<V, C>>(() => ({ _states: _states, state, store, set, validate, reset, refresh }), [state, store, set, validate, reset, refresh])
}

export default useNestedState
