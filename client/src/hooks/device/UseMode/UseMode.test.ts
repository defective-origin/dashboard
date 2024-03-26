// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useMode from './UseMode.hook'


describe('[useMode] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useMode())

    expect(result.current).toEqual(null)
  })
})
