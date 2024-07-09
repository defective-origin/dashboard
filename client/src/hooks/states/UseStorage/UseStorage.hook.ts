import { useCallback, useLayoutEffect, useState } from 'react'
import useEvent from '../../dom/UseEvent'

const STORAGE_MAP = {
  local: localStorage,
  session: sessionStorage,
}

type StorageName = keyof typeof STORAGE_MAP

export type StorageOptions<T> = {
  defaultValue?: T
  type?: StorageName
}

export type StorageReturnOptions<T> = [T, (value: T) => void]
// export type StorageManager = null

/**
 * Allow to get, to set and to watch storage value.
 * LocalStorage is used by default
 *
 * @example
 * const [value, setValue] = useStorage('VALUE_NAME', options)
 */
export const useStorage = <T>(name: string, options: StorageOptions<T> = {}): StorageReturnOptions<T> => {
  const [state, setState] = useState<T>(options.defaultValue as T)
  const type = options?.type ?? 'local'
  const key = `${type}:storage:${name}`
  const storage = STORAGE_MAP[type]

  const get = useCallback(() => {
    const storeValue = storage.getItem(name)
    const parsedValue = storeValue && JSON.parse(storeValue)

    return parsedValue
  }, [name, storage])

  const set = useCallback((val: T) => {
    storage.setItem(name, JSON.stringify(val))
    document.body.dispatchEvent(new CustomEvent(key))
  }, [key, name, storage])

  // initialize state
  useLayoutEffect(() => {
    const value = get()
    if (value != undefined) {
      setState(value)
    } else if (options.defaultValue != undefined) {
      set(options.defaultValue)
    }
  }, [get, set, options.defaultValue])

  // subscribes on storage change
  useEvent(key, () => set(get()))


  return [state, set]
}

export const useLocalStorage = <T>(name: string, options?: StorageOptions<T>) => useStorage<T>(name, { type: 'local', ...options })
export const useSessionStorage = <T>(name: string, options?: StorageOptions<T>) => useStorage<T>(name, { type: 'session', ...options })

export default useStorage

