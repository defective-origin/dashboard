import useStorage from './UseStorage.hook'
import { BrowserStorage, BrowserStorageEventListener, LocalStorage } from './UseStorage.tools'


describe('[useStorage] hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return options', () => {
    const { result } = renderHook(() => useStorage('name', { storage: LocalStorage }))

    act(() => result.current.set(3))

    expect(result.current).toEqual({
      state: 3,
      get: expect.any(Function),
      set: expect.any(Function),
      mutate: expect.any(Function),
    })
  })

  it('should return default value if value is not exist', () => {
    const { result } = renderHook(() => useStorage('name', { storage: LocalStorage, defaultValue: 'DEFAULT' }))

    expect(result.current.get()).toEqual('DEFAULT')
  })

  it('should set value', () => {
    const { result } = renderHook(() => useStorage('name', { storage: LocalStorage }))

    act(() => result.current.set('VALUE'))

    expect(result.current.get()).toEqual('VALUE')
  })
})

describe('[useStorage] tools', () => {
  describe('[BrowserStorage] class', () => {
    let storage: BrowserStorage
    let mockListener: BrowserStorageEventListener

    beforeEach(() => {
      localStorage.clear()
      storage = new BrowserStorage(localStorage)
      mockListener = vi.fn()
    })


    describe('[toEventKey] func', () => {
      it('should return storage key', () => {
        expect(storage.toEventKey('name')).toEqual('storage:name')
      })
    })

    describe('[keys] func', () => {
      it('should return saved keys', () => {
        expect(storage.keys()).toEqual([])

        act(() => storage.set('value1', 1))
        act(() => storage.set('value2', 2))

        expect(storage.keys()).toEqual(['value1', 'value2'])
      })
    })

    describe('[clear] func', () => {
      it('should remove all saved keys', () => {
        act(() => storage.set('value1', 1))
        act(() => storage.set('value2', 2))

        expect(storage.keys().length).toEqual(2)

        act(() => storage.clear())

        expect(storage.keys().length).toEqual(0)
      })

      it('should notify about changes for each removed value', () => {
        act(() => storage.set('value1', 1))
        act(() => storage.set('value2', 2))

        storage.subscribe('value1', mockListener)
        storage.subscribe('value2', mockListener)

        act(() => storage.clear())

        expect(mockListener).toHaveBeenCalledTimes(2)
      })
    })

    describe('[get] func', () => {
      it('should return value', () => {
        expect(storage.get('test-key')).toEqual(undefined)

        act(() => storage.set('test-key', 1))

        expect(storage.get('test-key')).toEqual(1)
      })

      it('should return default value if not exist', () => {
        expect(storage.get('test-key', 'DEFAULT_VALUE')).toEqual('DEFAULT_VALUE')
      })
    })

    describe('[set] func', () => {
      it('should save any value', () => {
        act(() => storage.set('string', 'value'))
        expect(storage.get('string')).toEqual('value')

        act(() => storage.set('number', 1))
        expect(storage.get('number')).toEqual(1)

        act(() => storage.set('object', { num: 1, string: 'val' }))
        expect(storage.get('object')).toEqual({ num: 1, string: 'val' })
      })

      it('should notify about changes', () => {
        storage.subscribe('test-key', mockListener)

        act(() => storage.set('test-key', 1))

        expect(mockListener).toHaveBeenCalled()
      })

      it('should not notify about changes if old and new values the same', () => {
        storage.subscribe('test-key', mockListener)

        act(() => storage.set('test-key', 1))

        expect(mockListener).toHaveBeenCalledTimes(1)

        act(() => storage.set('test-key', 1))

        expect(mockListener).toHaveBeenCalledTimes(1)
      })
    })

    describe('[mutate] func', () => {
      it('should save any value', () => {
        expect(storage.get('value')).toEqual(undefined)

        act(() => storage.mutate('value', (prev: number = 0) => prev + 1))

        expect(storage.get('value')).toEqual(1)
      })

      it('should notify about changes', () => {
        storage.subscribe('test-key', mockListener)

        act(() => storage.mutate('test-key', () => 1))

        expect(mockListener).toHaveBeenCalled()
      })
    })

    describe('[remove] func', () => {
      it('should save any value', () => {
        act(() => storage.set('value', 1))

        expect(storage.get('value')).toEqual(1)

        act(() => storage.remove('value'))

        expect(storage.get('value')).toEqual(undefined)
      })

      it('should notify about changes', () => {
        storage.subscribe('test-key', mockListener)

        act(() => storage.set('test-key', 1))
        act(() => storage.remove('test-key'))

        expect(mockListener).toHaveBeenCalledTimes(2)
      })

      it('should not notify about changes if value was not existed', () => {
        storage.subscribe('test-key', mockListener)

        act(() => storage.remove('test-key'))

        expect(mockListener).not.toHaveBeenCalled()
      })
    })

    describe('[notify] func', () => {
      it('should dispatch a custom event on document.body with the correct type', () => {
        storage.subscribe('test-key', mockListener)

        storage.notify('test-key')

        expect(mockListener).toHaveBeenCalledTimes(1)
      })
    })

    describe('[subscribe] func', () => {
      it('should trigger subscribed function when storage event occurs', () => {
        storage.subscribe('test-key', mockListener)

        act(() => storage.notify('test-key'))

        expect(mockListener).toHaveBeenCalledTimes(1)
      })
    })

    describe('[unsubscribe] func', () => {
      it('should not call subscribed function after unsubscribe', () => {
        storage.subscribe('test-key', mockListener)

        act(() => storage.notify('test-key'))

        expect(mockListener).toHaveBeenCalledTimes(1)

        storage.unsubscribe('test-key', mockListener)

        act(() => storage.notify('test-key'))

        expect(mockListener).toHaveBeenCalledTimes(1)
      })
    })
  })
})
