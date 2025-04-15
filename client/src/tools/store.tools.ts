class Store {
  constructor(public store: Storage) {}

  get = <T = unknown>(key: string, defaultValue?: T) => {
    const value = this.store.getItem(key)

    if (!value) {
      return defaultValue
    }

    try {
      return JSON.parse(value) as T
    } catch (error) {
      this.store.removeItem(key)

      return defaultValue
    }
  }

  set = <T = unknown>(key: string, data: T) => {
    this.store.setItem(key, JSON.stringify(data))
  }

  del = (key: string) => {
    const value = this.get(key)
    this.store.removeItem(key)

    return value
  }

  clear = () => this.store.clear()
}

export const LocalStore = new Store(localStorage)
export const SessionStore = new Store(sessionStorage)
