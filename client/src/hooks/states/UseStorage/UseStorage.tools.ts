// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BrowserStorageEventListener = (newValue?: any) => void

export class BrowserStorage {
  constructor(public storage: Storage) {}

  toEventKey = (key: string) => `storage:${key}`

  notify = (key: string) => document.body.dispatchEvent(new CustomEvent(this.toEventKey(key)))
  subscribe = (key: string, listener: BrowserStorageEventListener) => {
    document.body.addEventListener(this.toEventKey(key), listener)
    // listen other tabs or iframes
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
    window.addEventListener('storage', event => {
      if (key === event.key) {
        listener(event.newValue)
      }
    })
  }
  unsubscribe = (key: string, listener: BrowserStorageEventListener) => {
    document.body.removeEventListener(this.toEventKey(key), listener)
    window.removeEventListener('storage', listener)
  }

  get = <T = unknown>(key: string, defaultValue?: T) => {
    const value = this.storage.getItem(key)

    if (!value) {
      return defaultValue
    }

    try {
      return JSON.parse(value) as T
    } catch (error) {
      this.storage.removeItem(key)

      return defaultValue
    }
  }

  set = <T = unknown>(key: string, data: T) => {
    this.storage.setItem(key.toString(), JSON.stringify(data))
    this.notify(key)
  }

  mutate = <T = unknown>(key: string, callback: (prev?: T) => T, defaultValue?: T) => {
    this.set(key, callback(this.get(key, defaultValue)))
  }

  remove = (key: string) => {
    const value = this.get(key)
    this.storage.removeItem(key.toString())
    this.notify(key)

    return value
  }

  clear = () => {
    const keys = Object.keys(localStorage)

    this.storage.clear()

    for (const key of keys) {
      this.notify(key)
    }
  }
}

export const LocalStorage = new BrowserStorage(localStorage)
export const SessionStorage = new BrowserStorage(sessionStorage)
