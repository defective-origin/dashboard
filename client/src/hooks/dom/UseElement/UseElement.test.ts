// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useElement from './UseElement.hook'


describe('[useElement] hook', () => {
  it('should return empty ref for subscription on element tag', () => {
    const { result } = renderHook(() => useElement())

    expect(result.current.current).toEqual(null)
  })

  it('should return element ref', () => {
    const { result } = renderHook(() => useElement(document.body))

    expect(result.current.current).toEqual(document.body)
  })

  it('should return default element ref', () => {
    const { result } = renderHook(() => useElement(null, document.body))

    expect(result.current.current).toEqual(document.body)
  })
})
