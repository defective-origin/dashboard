import { AsyncLocalStorage } from 'async_hooks'

// https://github.com/oven-sh/bun/issues/6393#issuecomment-1877978405
type keys = 'user'
type StoreContext = {
  [key in keys]?: any
}

const store = new AsyncLocalStorage<StoreContext>()

export const Storage = {
  run: store.run,
  init: store.run.bind(store, {}),
  set: (key: keys, value: any) => {
    const storeData = store.getStore() ?? {}
    storeData[key] = value
    store.enterWith(storeData)
  },
  get: (key: keys) => {
    const storeData = store.getStore() ?? {}

    return storeData[key]
  },
}
