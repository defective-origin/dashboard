// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useElement from './UseElement.hook'


describe('[useElement] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useElement())

    expect(result.current).toEqual(null)
  })
})
