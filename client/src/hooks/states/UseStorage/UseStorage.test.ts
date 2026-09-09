// ---| tests |---
import { MockInstance } from 'vitest'
import { renderHook } from '@testing-library/react'

// ---| self |---
import useStorage from './UseStorage.hook'
import { BrowserStorage, LocalStorage } from './UseStorage.tools'


describe('[useStorage] hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return options', () => {
    const { result } = renderHook(() => useStorage('name', { storage: LocalStorage }))

    result.current.set(3)

    expect(result.current).toEqual({
      state: undefined,
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

    result.current.set('VALUE')

    expect(result.current.get()).toEqual('VALUE')
  })
})

describe('[useStorage] tools', () => {
  describe('[BrowserStorage] class', () => {
    let storage: BrowserStorage
    let dispatchSpy: MockInstance

    beforeEach(() => {
      dispatchSpy = vi.spyOn(document.body, 'dispatchEvent')
      storage = new BrowserStorage(localStorage)
    })

    afterEach(() => {
      dispatchSpy.mockRestore()
      storage.clear()
    })

    describe('[toEventKey] func', () => {
      it('should return storage key', () => {
        expect(storage.toEventKey('name')).toEqual('storage:name')
      })
    })

    describe('[keys] func', () => {
      it('should return saved keys', () => {
        expect(storage.keys()).toEqual([])

        storage.set('value1', 1)
        storage.set('value2', 2)

        expect(storage.keys()).toEqual(['value1', 'value2'])
      })
    })

    describe('[clear] func', () => {
      it('should remove all saved keys', () => {
        storage.set('value1', 1)
        storage.set('value2', 2)

        expect(storage.keys().length).toEqual(2)

        storage.clear()

        expect(storage.keys().length).toEqual(0)
      })

      it('should notify about changes for each removed value', () => {
        storage.set('value1', 1)
        storage.set('value2', 2)

        storage.clear()

        expect(dispatchSpy).toHaveBeenCalledTimes(4)
      })
    })

    describe('[get] func', () => {
      it('should return value', () => {
        expect(storage.get('value')).toEqual(undefined)

        storage.set('value', 1)

        expect(storage.get('value')).toEqual(1)
      })

      it('should return default value if not exist', () => {
        expect(storage.get('value', 'DEFAULT_VALUE')).toEqual('DEFAULT_VALUE')
      })
    })

    describe('[set] func', () => {
      it('should save any value', () => {
        storage.set('string', 'value')
        expect(storage.get('string')).toEqual('value')

        storage.set('number', 1)
        expect(storage.get('number')).toEqual(1)

        storage.set('object', { num: 1, string: 'val' })
        expect(storage.get('object')).toEqual({ num: 1, string: 'val' })
      })

      it('should notify about changes', () => {
        storage.set('value', 1)

        expect(dispatchSpy).toHaveBeenCalled()
      })

      it('should not notify about changes if old and new values the same', () => {
        storage.set('value', 1)

        expect(dispatchSpy).toHaveBeenCalledTimes(1)

        storage.set('value', 1)

        expect(dispatchSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('[mutate] func', () => {
      it('should save any value', () => {
        expect(storage.get('value')).toEqual(undefined)

        storage.mutate('value', (prev: number = 0) => prev + 1)

        expect(storage.get('value')).toEqual(1)
      })

      it('should notify about changes', () => {
        storage.mutate('value', () => 1)

        expect(dispatchSpy).toHaveBeenCalled()
      })
    })

    describe('[remove] func', () => {
      it('should save any value', () => {
        storage.set('value', 1)

        expect(storage.get('value')).toEqual(1)

        storage.remove('value')

        expect(storage.get('value')).toEqual(undefined)
      })

      it('should notify about changes', () => {
        storage.set('value', 1)
        storage.remove('value')

        expect(dispatchSpy).toHaveBeenCalledTimes(2)
      })

      it('should not notify about changes if value was not existed', () => {
        storage.remove('value')

        expect(dispatchSpy).not.toHaveBeenCalled()
      })
    })

    describe('[notify] func', () => {
      it('should dispatch a custom event on document.body with the correct type', () => {
        storage.notify('test-key')

        expect(dispatchSpy).toHaveBeenCalledTimes(1)

        // Grab the actual event passed to dispatchEvent
        const callArg = dispatchSpy.mock.calls[0][0] as CustomEvent
        expect(callArg.type).toEqual('storage:test-key')
        expect(callArg).toBeInstanceOf(CustomEvent)
      })
    })

    describe('[subscribe] func', () => {
      let bodyAddSpy: MockInstance
      let windowAddSpy: MockInstance

      beforeEach(() => {
        bodyAddSpy = vi.spyOn(document.body, 'addEventListener')
        windowAddSpy = vi.spyOn(window, 'addEventListener')
      })

      afterEach(() => {
        bodyAddSpy.mockRestore()
        windowAddSpy.mockRestore()
      })

      it('should attach event listeners to body and window', () => {
        const mockListener = vi.fn()
        storage.subscribe('test-key', mockListener)

        expect(bodyAddSpy).toHaveBeenCalledWith('storage:test-key', mockListener)
        expect(windowAddSpy).toHaveBeenCalledWith('storage', expect.any(Function))
      })

      it('should trigger listener when a matching storage event occurs', () => {
        const mockListener = vi.fn()
        storage.subscribe('test-key', mockListener)

        // Find the anonymous storage handler that was passed to window.addEventListener
        const storageCall = windowAddSpy.mock.calls.find(call => call[0] === 'storage')
        const registeredStorageHandler = storageCall?.[1]

        expect(registeredStorageHandler).toBeDefined()

        // Simulate a matching event
        const matchingEvent = new StorageEvent('storage', { key: 'test-key', newValue: 'mocked-value' })
        registeredStorageHandler(matchingEvent)
        expect(mockListener).toHaveBeenCalledWith('mocked-value')

        // Simulate a non-matching event (should not trigger listener)
        const nonMatchingEvent = new StorageEvent('storage', { key: 'different-key', newValue: 'ignored' })
        registeredStorageHandler(nonMatchingEvent)
        expect(mockListener).toHaveBeenCalledTimes(1)
      })
    })

    describe('[unsubscribe] func', () => {
      let bodyRemoveSpy: MockInstance
      let windowRemoveSpy: MockInstance

      beforeEach(() => {
        bodyRemoveSpy = vi.spyOn(document.body, 'removeEventListener')
        windowRemoveSpy = vi.spyOn(window, 'removeEventListener')
      })

      afterEach(() => {
        bodyRemoveSpy.mockRestore()
        windowRemoveSpy.mockRestore()
      })

      it('should remove body event listener', () => {
        const mockListener = vi.fn()
        storage.unsubscribe('test-key', mockListener)

        expect(bodyRemoveSpy).toHaveBeenCalledWith('storage:test-key', mockListener)
        expect(windowRemoveSpy).toHaveBeenCalledWith('storage', mockListener)
      })
    })
  })
})
