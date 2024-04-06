// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useResizeObserver from './UseResizeObserver.hook'


describe('[useResizeObserver] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useResizeObserver())

    expect(result.current).toEqual(null)
  })
})
