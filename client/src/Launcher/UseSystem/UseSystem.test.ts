// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useSystem from './UseSystem.hook'


describe('[useSystem] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useSystem())

    expect(result.current).toEqual(null)
  })
})
