import { useCallback, useEffect, useState } from 'react'

// ---| self |---
import { LocalStorage, SessionStorage, BrowserStorage } from './UseStorage.tools'

export type StorageOptions<T> = {
  defaultValue?: T
  storage: BrowserStorage
}

// export type StorageManager = null

/**
 * Allow to get, to set and to watch storage value.
 * LocalStorage is used by default
 *
 * @example
 * const [value, setValue] = useStorage('VALUE_NAME', DEFAULT_VALUE)
 */
export const useStorage = <T>(key: string, options: StorageOptions<T>) => {
  const { defaultValue, storage } = options
  const [state, setState] = useState<T | undefined>(storage.get(key, defaultValue))

  const get = useCallback(() => storage.get(key, defaultValue), [defaultValue, key, storage])
  const mutate = useCallback((callback: (prev?: T) => T) => storage.mutate(key, callback, defaultValue), [defaultValue, key, storage])
  const set = useCallback((val: T) => {
    setState(val)
    storage.set(key, val)
  }, [key, storage])

  // subscribe on change
  useEffect(() => {
    const update = () => setState(get())

    storage.subscribe(key, update)

    return () => storage.unsubscribe(key, update)
  }, [get, key, storage])


  return {
    state,
    get,
    set,
    mutate,
  }
}

export const useLocalStorage = <T>(key: string, defaultValue?: T) => useStorage<T>(key, { storage: LocalStorage, defaultValue })
export const useSessionStorage = <T>(key: string, defaultValue?: T) => useStorage<T>(key, { storage: SessionStorage, defaultValue })

export default useStorage

