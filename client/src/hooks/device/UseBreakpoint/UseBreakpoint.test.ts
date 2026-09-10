import useBreakpoint, { Breakpoint } from './UseBreakpoint.hook'


class TestBreakpoint implements Breakpoint {
  constructor(
    public name: string,
    public size = Number.MAX_SAFE_INTEGER,
  ) {}
}

const BREAKPOINTS = [
  new TestBreakpoint('first', 1000),
  new TestBreakpoint('second'),
]


describe('[useBreakpoint] hook', () => {
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

  const resize = (size: number) => {
    Object.defineProperties(element, {
      clientWidth: { value: size, configurable: true },
      clientHeight: { value: size, configurable: true },
    })

    triggerResizeObserver([])
  }

  it('should observe width change', async () => {
    const { result } = renderHook(() => useBreakpoint(BREAKPOINTS, { ref: element }))

    expect(result.current.name).toEqual('second')

    act(() => resize(1000))

    expect(result.current.name).toEqual('first')

    act(() => resize(1001))

    expect(result.current.name).toEqual('second')
  })

  it('should observe height change', () => {
    const { result } = renderHook(() => useBreakpoint(BREAKPOINTS, { direction: 'y', ref: element }))

    expect(result.current.name).toEqual('second')

    act(() => resize(1000))

    expect(result.current.name).toEqual('first')

    act(() => resize(1001))

    expect(result.current.name).toEqual('second')
  })
})
