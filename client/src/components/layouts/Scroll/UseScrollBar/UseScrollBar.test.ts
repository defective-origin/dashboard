// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import scrollBar from './UseScrollBar.hooks'


describe('[scrollBar] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => scrollBar())

    expect(result.current).toEqual(null)
  })
})
