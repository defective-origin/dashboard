// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import usePaginationBreakpoint from './UsePaginationBreakpoint.hook'


const ITEMS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const BREAKPOINT = { count: 5, size: 1000 }
const BREAKPOINTS = [BREAKPOINT]

vi.mock('../UseBreakpoint', () => ({
  default: vi.fn(() => BREAKPOINT),
}))

describe('[usePaginationBreakpoint] hook', () => {
  it('should return first page', () => {
    const { result } = renderHook(() => usePaginationBreakpoint(ITEMS, BREAKPOINTS))

    expect(result.current.items).toEqual([1, 2, 3, 4, 5])
    expect(result.current.page).toEqual(1)
    expect(result.current.pages).toEqual(2)
  })

  it('should navigate by pages', () => {
    const { result } = renderHook(() => usePaginationBreakpoint(ITEMS, BREAKPOINTS))

    expect(result.current.page).toEqual(1)
    expect(result.current.items).toEqual([1, 2, 3, 4, 5])
    expect(result.current.hasPrev).toEqual(false)
    expect(result.current.hasNext).toEqual(true)

    result.current.next()

    expect(result.current.page).toEqual(2)
    expect(result.current.items).toEqual([6, 7, 8, 9])
    expect(result.current.hasPrev).toEqual(true)
    expect(result.current.hasNext).toEqual(false)

    result.current.prev()

    expect(result.current.page).toEqual(1)
    expect(result.current.items).toEqual([1, 2, 3, 4, 5])

  })
})
