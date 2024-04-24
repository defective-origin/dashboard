// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useFormat from './UseFormat.hook'


describe('[useFormat] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useFormat())

    expect(result.current).toEqual(null)
  })
})
