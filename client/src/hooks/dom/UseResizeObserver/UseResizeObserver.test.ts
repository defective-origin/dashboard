import useResizeObserver from './UseResizeObserver.hook'


describe('[useResizeObserver] hook', () => {
  let observer: ResizeObserver | undefined
  const element = document.body
  const options = { ref: element }

  beforeEach(() => {
    observer = undefined
    // Создаем полноценный класс mock-конструктор
    const MockResizeObserver = vi.fn().mockImplementation(function () {
      observer = {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
      return observer
    })

    vi.stubGlobal('ResizeObserver', MockResizeObserver)
  })

  it('should subscribe on changes on mount', () => {
    const { result } = renderHook(() => useResizeObserver(() => {}, options))

    expect(result.current.current).toEqual(element)
    expect(observer?.observe).toHaveBeenCalledWith(element, options)
  })

  it('should not subscribe on changes on mount if it is disabled', () => {
    const { result } = renderHook(() => useResizeObserver(() => {}, { disable: true, ...options }))

    expect(result.current.current).toEqual(element)
    expect(observer).toBeUndefined()
  })

  it('should unsubscribe on changes on unmount', () => {
    const { unmount } = renderHook(() => useResizeObserver(() => {}, options))

    unmount()

    expect(observer?.disconnect).toHaveBeenCalledTimes(1)
  })
})
