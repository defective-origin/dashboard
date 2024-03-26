// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useNestedState from './UseNestedState.hook'


describe('[useNestedState] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useNestedState())

    expect(result.current).toEqual(null)
  })
})
