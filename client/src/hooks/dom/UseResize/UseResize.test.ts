import useResize from './UseResize.hook'


describe('[useResize] hook', () => {
  let element: HTMLDivElement
  let triggerResizeObserver: (entries: Partial<ResizeObserverEntry>[]) => void

  beforeEach(() => {
    element = document.createElement('div')
    Object.defineProperties(element, {
      clientWidth: { value: 10000, configurable: true },
      clientHeight: { value: 10000, configurable: true },
    })

    // don't mock self implementation like useResizeObserver
    // in order to not stick to implementation
    vi.stubGlobal('ResizeObserver', class MockResizeObserver {
      constructor(cb: (entries: Partial<ResizeObserverEntry>[]) => void) {
        triggerResizeObserver = cb
      }
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    })
  })

  it('should return default options', () => {
    const { result } = renderHook(() => useResize())
    expect(result.current).toEqual({
      ref: { current: document.body },
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      x: 0,
      y: 0,
    })
  })

  it('should observe resizing', () => {
    const rect = {
      width: 100,
      height: 100,
      left: 100,
      right: 100,
      top: 100,
      bottom: 100,
      x: 100,
      y: 100,
    }
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({ toJSON: () => {}, ...rect })

    const { result } = renderHook(() => useResize({ ref: element }))

    act(() => triggerResizeObserver([]))

    expect(result.current).toEqual({ ref: { current: element }, ...rect})
  })
})
