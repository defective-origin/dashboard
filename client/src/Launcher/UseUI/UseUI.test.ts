// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useUI from './UseUI.hook'


describe('[useUI] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useUI())

    expect(result.current).toEqual(null)
  })
})
