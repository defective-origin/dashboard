// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useEvent from './UseEvent.hook'


describe('[useEvent] hook', () => {
  const element = { ...document.body, addEventListener: vi.fn(), removeEventListener: vi.fn() }
  const listener = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should add event listener', () => {
    const { result } = renderHook(() => useEvent('click', listener, { ref: element }))

    expect(result.current.current?.addEventListener).toHaveBeenCalledTimes(1)
  })

  it('should not add event listener if it is disabled', () => {
    const { result } = renderHook(() => useEvent('click', listener, { ref: element, disable: true }))

    expect(result.current.current?.addEventListener).toHaveBeenCalledTimes(0)
  })

  it('should remove event listener on unmount', () => {
    const { result, unmount } = renderHook(() => useEvent('click', listener, { ref: element }))

    unmount()

    expect(result.current.current?.removeEventListener).toHaveBeenCalledTimes(1)
  })

  it('should dispatch event on passed element', () => {
    const { result } = renderHook(() => useEvent('click', listener, { ref: document.body }))

    result.current.current?.dispatchEvent(new MouseEvent('click'))

    expect(result.current.current).toEqual(document.body)
    expect(listener).toHaveBeenCalledTimes(1)
  })
})
