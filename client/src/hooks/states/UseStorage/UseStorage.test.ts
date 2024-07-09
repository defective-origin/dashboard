// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useStorage from './UseStorage.hook'


describe('[useStorage] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useStorage())

    expect(result.current).toEqual(null)
  })
})
