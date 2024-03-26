// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useLogger from './UseLogger.hook'


describe('[useLogger] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useLogger())

    expect(result.current).toEqual(null)
  })
})
