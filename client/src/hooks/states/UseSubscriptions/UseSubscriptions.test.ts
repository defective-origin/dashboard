// ---| tests |---
import { renderHook } from '@testing-library/react'

// ---| self |---
import useSubscriptions from './UseSubscriptions.hook'


describe('[useSubscriptions] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useSubscriptions())

    expect(result.current).toEqual({
      "emit": expect.any(Function),
      "names": expect.any(Function),
      "off": expect.any(Function),
      "on": expect.any(Function),
    })
  })
})
