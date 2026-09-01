// ---| tests |---
import { renderHook } from '@testing-library/react'

// ---| self |---
import useScrollBar from './UseScrollBar.hooks'


describe('[scrollBar] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useScrollBar({}))

    expect(result.current).toBeDefined()
  })
})
