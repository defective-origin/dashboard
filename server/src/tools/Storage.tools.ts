import { AsyncLocalStorage } from 'async_hooks'

// https://github.com/oven-sh/bun/issues/6393#issuecomment-1877978405
export type StoreContext = {
  user?: unknown
}

export type StorageKeys = keyof StoreContext

const store = new AsyncLocalStorage<StoreContext>()

export const Storage = {
  run: store.run,
  init: store.run.bind(store, {}),
  get: <K extends StorageKeys>(key: StorageKeys): StoreContext[K] | undefined => {
    const storeData = store.getStore() ?? {}

    return storeData[key]
  },
  set: <K extends StorageKeys>(key: K, value: StoreContext[K]) => {
    const storeData = store.getStore() ?? {}
    storeData[key] = value
    store.enterWith(storeData)
  },
}
