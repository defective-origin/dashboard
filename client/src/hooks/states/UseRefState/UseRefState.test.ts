import useRefState from './UseRefState.hook'


describe('[useRefState] hook', () => {
  it('should return options', () => {
    const value = { value: 5 }
    const { result } = renderHook(() => useRefState(value))

    expect(result.current).toEqual(value)
  })
})
