// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useBreakpoint, { Breakpoint } from './UseBreakpoint.hook'

describe('[useBreakpoint] hook', () => {
  const element = { clientHeight: 10000, clientWidth: 10000 }

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

  let observer: any
  let updater: (...args: unknown[]) => void
  const resize = (size: number) => {
    element.clientHeight = size
    element.clientWidth = size
    updater()
  }

  beforeEach(() => {
    Object.defineProperty(global, 'ResizeObserver', {
      writable: true,
      value: vi.fn().mockImplementation((cb) => {
        updater = cb
        observer = {
          observe: vi.fn(),
          unobserve: vi.fn(),
          disconnect: vi.fn(),
        }

        return observer
      }),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()

    Object.defineProperty(global, 'ResizeObserver', {
      writable: true,
      value: undefined,
    })
  })

  it('should observe width change', () => {
    const { result } = renderHook(() => useBreakpoint(BREAKPOINTS, { ref: { current: element as HTMLElement } }))

    expect(result.current.name).toEqual('second')

    resize(1000)

    expect(result.current.name).toEqual('first')

    resize(1001)

    expect(result.current.name).toEqual('second')
  })

  it('should observe height change', () => {
    const { result } = renderHook(() => useBreakpoint(BREAKPOINTS, { direction: 'y', ref: { current: element as HTMLElement } }))

    expect(result.current.name).toEqual('second')

    resize(1000)

    expect(result.current.name).toEqual('first')

    resize(1001)

    expect(result.current.name).toEqual('second')
  })


  it('should subscribe and unsubscribe on changes on mount/unmount', () => {
    const { unmount } = renderHook(() => useBreakpoint(BREAKPOINTS, { ref: { current: element as HTMLElement } }))

    expect(observer.observe).toHaveBeenCalledWith(element)

    unmount()

    expect(observer.disconnect).toHaveBeenCalledTimes(1)
  })
})
