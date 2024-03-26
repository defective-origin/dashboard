// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useMonitor from './UseMonitor.hook'


describe('[useMonitor] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useMonitor())

    expect(result.current).toEqual(null)
  })
})
