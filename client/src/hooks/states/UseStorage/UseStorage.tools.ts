export type BrowserStorageEventListener = () => void

export class BrowserStorage {
  constructor(public storage: Storage) {}


  keys = () => Object.keys(this.storage)
  toEventKey = (key: string) => `storage:${key}`

  notify = (key: string) => {
    // notify current page
    document.dispatchEvent(new CustomEvent(this.toEventKey(key)))
    // notify other browser tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: this.toEventKey(key),
      storageArea: this.storage,
    }))
  }

  subscribe = (key: string, listener: BrowserStorageEventListener) => {
    // listen current page
    document.addEventListener(this.toEventKey(key), listener)
    // listen other browser tabs
    window.addEventListener('storage', event => {
      if (key === event.key) {
        listener()
      }
    })
  }

  unsubscribe = (key: string, listener: BrowserStorageEventListener) => {
    document.removeEventListener(this.toEventKey(key), listener)
    window.removeEventListener('storage', listener)
  }

  get = <T = unknown>(key: string, defaultValue?: T) => {
    const value = this.storage.getItem(key)

    if (!value) {
      return defaultValue
    }

    try {
      return JSON.parse(value) as T
    } catch {
      this.storage.removeItem(key)

      return defaultValue
    }
  }

  set = <T = unknown>(key: string, data: T) => {
    const value = JSON.stringify(data)

    if (this.storage.getItem(key) !== value) {
      this.storage.setItem(key.toString(), value)
      this.notify(key)
    }
  }

  mutate = <T = unknown>(key: string, callback: (prev?: T) => T, defaultValue?: T) => {
    this.set(key, callback(this.get(key, defaultValue)))
  }

  remove = (key: string) => {
    const value = this.get(key)
    this.storage.removeItem(key.toString())

    if (value) {
      this.notify(key)
    }

    return value
  }

  clear = () => {
    const keys = this.keys()

    this.storage.clear()

    for (const key of keys) {
      this.notify(key)
    }
  }
}

export const LocalStorage = new BrowserStorage(localStorage)
export const SessionStorage = new BrowserStorage(sessionStorage)
