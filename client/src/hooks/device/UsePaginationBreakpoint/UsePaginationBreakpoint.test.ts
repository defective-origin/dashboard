// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import usePaginationBreakpoint from './UsePaginationBreakpoint.hook'


describe('[usePaginationBreakpoint] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => usePaginationBreakpoint())

    expect(result.current).toEqual(null)
  })
})
