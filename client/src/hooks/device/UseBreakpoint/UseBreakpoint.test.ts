// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useBreakpoint, { Breakpoint } from './UseBreakpoint.hook'


let updater: (...args: unknown[]) => void
const element = { clientHeight: 10000, clientWidth: 10000 } as Element

vi.mock('../../dom/UseResizeObserver', () => ({
  default: vi.fn((cb) => { updater = cb }),
}))

describe('[useBreakpoint] hook', () => {
  const resize = (size: number) => {
    Object.assign(element, { clientHeight: size, clientWidth: size })

    updater()
  }

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

  it('should observe width change', async () => {
    const { result } = renderHook(() => useBreakpoint(BREAKPOINTS, { ref: element }))

    expect(result.current.name).toEqual('second')

    resize(1000)

    expect(result.current.name).toEqual('first')

    resize(1001)

    expect(result.current.name).toEqual('second')
  })

  it('should observe height change', () => {
    const { result } = renderHook(() => useBreakpoint(BREAKPOINTS, { direction: 'y', ref: element }))

    expect(result.current.name).toEqual('second')

    resize(1000)

    expect(result.current.name).toEqual('first')

    resize(1001)

    expect(result.current.name).toEqual('second')
  })
})
