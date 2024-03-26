// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useFeatures from './UseFeatures.hook'


describe('[useFeatures] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useFeatures())

    expect(result.current).toEqual(null)
  })
})
