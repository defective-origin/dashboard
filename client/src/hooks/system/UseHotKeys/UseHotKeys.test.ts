// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useHotKeys from './UseHotKeys.hook'


describe('[useHotKeys] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useHotKeys())

    expect(result.current).toMatchObject({
      add: expect.any(Function),
      remove: expect.any(Function),
    })
  })
})
