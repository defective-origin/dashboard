import { AsyncLocalStorage } from 'async_hooks'

// https://github.com/oven-sh/bun/issues/6393#issuecomment-1877978405
export type StoreContext = {
  'user'?: any
}

export type StorageKeys = keyof StoreContext

const store = new AsyncLocalStorage<StoreContext>()

export const Storage = {
  run: store.run,
  init: store.run.bind(store, {}),
  get: (key: StorageKeys) => {
    const storeData = store.getStore() ?? {}

    return storeData[key]
  },
  set: (key: StorageKeys, value: any) => {
    const storeData = store.getStore() ?? {}
    storeData[key] = value
    store.enterWith(storeData)
  },
}
