// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useFunc from './UseFunc.hook'


describe('[useFunc] hook', () => {
  it('should return callback', () => {
    const callback = vi.fn((...args: number[]) => args)
    const { result } = renderHook(() => useFunc(callback))

    result.current(1, 2)

    expect(Object.is(result.current, callback)).toBeFalsy()
    expect(callback).toBeCalledWith(1, 2)
  })
})
