import useHotKeys from './UseHotKeys.hook'


describe('[useHotKeys] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useHotKeys())

    expect(result.current).toMatchObject({
      add: expect.any(Function),
      remove: expect.any(Function),
    })
  })
})
