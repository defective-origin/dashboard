// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useMode from './UseMode.hook'


describe('[useMode] hook', () => {
  it('should add classes to body', () => {
    renderHook(() => useMode('CLASS_1', 'CLASS_2'))

    expect(document.body).toHaveClass('CLASS_1', 'CLASS_2')
  })

  it('should replace classes on change', () => {
    const { rerender } = renderHook((...args) => useMode(...args), { initialProps: ['CLASS_1', 'CLASS_2'] })

    rerender(['CLASS_2', 'CLASS_3'])

    expect(document.body).toHaveClass('CLASS_2', 'CLASS_3')
    expect(document.body).not.toHaveClass('CLASS_4')
  })

  it('should remove classes on unmount', () => {
    const { unmount } = renderHook(() => useMode('CLASS_1', 'CLASS_2'))

    unmount()

    expect(document.body.classList.length).toEqual(0)
  })
})
