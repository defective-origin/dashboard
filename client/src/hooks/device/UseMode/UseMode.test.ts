// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useMode from './UseMode.hook'
import { waitFor } from '@testing-library/react'


describe('[useMode] hook', () => {
  // const body = document.body

  // beforeEach(() => {
  //   document.body = body.cloneNode()
  // })

  // afterEach(() => {

  // })


  it('should add classes to body', () => {
    renderHook(() => useMode('CLASS_1', 'CLASS_2'))

    expect(document.body).toHaveClass('CLASS_1', 'CLASS_2')
  })

  it('should replace classes on change', () => {
    const { result, rerender } = renderHook(() => useMode('CLASS_1', 'CLASS_2'))

    rerender(['CLASS_2', 'CLASS_3'])

    expect(document.body.className).toEqual('CLASS_2 CLASS_3')
    // expect(document.body).not.toHaveClass('CLASS_1')

    // result.current('CLASS_4', 'CLASS_5')

    // expect(document.body).toHaveClass('CLASS_4', 'CLASS_5')
    // expect(document.body).not.toHaveClass('CLASS_2', 'CLASS_3')
    // expect([...document.body.classList]).toEqual(['CLASS_1', 'CLASS_3'])
  })

  it('should remove classes on unmount', async () => {
    const { unmount } = renderHook(() => useMode('CLASS_1', 'CLASS_2'))

    unmount()

    await waitFor(() => expect(document.body.className).toEqual('CLASS_1 CLASS_3'))
  })
})
