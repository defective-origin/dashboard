// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useResize from './UseResize.hook'


describe('[useResize] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useResize())

    expect(result.current).toEqual(null)
  })
})
