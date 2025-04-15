// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useSubscribedState from './UseSubscribedState.hook'


describe('[useSubscribedState] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useSubscribedState())

    expect(result.current).toEqual(null)
  })
})
