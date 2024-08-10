// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useSubscriptions from './UseSubscriptions.hook'


describe('[useSubscriptions] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useSubscriptions())

    expect(result.current).toEqual(null)
  })
})
