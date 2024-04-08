// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useResize from './UseResize.hook'


let updater: (...args: unknown[]) => void
vi.mock('../UseResizeObserver', () => ({
  default: vi.fn((cb) => { updater = cb }),
}))

describe('[useResize] hook', () => {
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
    const element = { ...document.body, getBoundingClientRect: vi.fn() }
    const { result } = renderHook(() => useResize({ ref: element }))

    element.getBoundingClientRect.mockReturnValue({
      width: 100,
      height: 100,
      left: 100,
      right: 100,
      top: 100,
      bottom: 100,
      x: 100,
      y: 100,
    })

    updater()

    expect(result.current).toEqual({
      ref: { current: element },
      width: 100,
      height: 100,
      left: 100,
      right: 100,
      top: 100,
      bottom: 100,
      x: 100,
      y: 100,
    })
  })
})
