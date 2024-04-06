// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useEvent from './UseEvent.hook'


describe('[useEvent] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useEvent())

    expect(result.current).toEqual(null)
  })
})
