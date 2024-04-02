// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useMoreBreakpoint from './UseMoreBreakpoint.hook'


const ITEMS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const BREAKPOINT = { count: 5, size: 1000 }
const BREAKPOINTS = [BREAKPOINT]

vi.mock('../UseBreakpoint', () => ({
  useBreakpoint: vi.fn(() => BREAKPOINT),
}))

describe('[useMoreBreakpoint] hook', () => {
  it('should return items', () => {
    const { result } = renderHook(() => useMoreBreakpoint(ITEMS, BREAKPOINTS))

    expect(result.current.items).toEqual([1, 2, 3, 4, 5])
    expect(result.current.remainingItems).toEqual([6, 7, 8, 9])
  })

  it('should not include last item', () => {
    const { result } = renderHook(() => useMoreBreakpoint(ITEMS, BREAKPOINTS, { excludeLast: true }))

    expect(result.current.items).toEqual([1, 2, 3, 4])
    expect(result.current.remainingItems).toEqual([5, 6, 7, 8, 9])
  })

  it('should include last item if item is last in the list', () => {
    const { result } = renderHook(() => useMoreBreakpoint(ITEMS, BREAKPOINTS, { excludeLast: true }))

    expect(result.current.items).toEqual([1, 2, 3, 4])
    expect(result.current.remainingItems).toEqual([5, 6, 7, 8, 9])
  })

  it('should show/hide remaining items', () => {
    const { result } = renderHook(() => useMoreBreakpoint(ITEMS, BREAKPOINTS))

    expect(result.current.items).toEqual([1, 2, 3, 4, 5])
    expect(result.current.remainingItems).toEqual([6, 7, 8, 9])

    result.current.more()

    expect(result.current.items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(result.current.remainingItems).toEqual([])

    result.current.less()

    expect(result.current.items).toEqual([1, 2, 3, 4, 5])
    expect(result.current.remainingItems).toEqual([6, 7, 8, 9])
  })
})
