// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useProperties from './UseProperties.hook'


describe('[useProperties] hook', () => {
  it('should return variable map', () => {
    const { result } = renderHook(() => useProperties({
      primary: '--primary-color',
      secondary: '--secondary-color',
      success: '--success-color',
      info: '--info-color',
      warning: '--warning-color',
      error: '--error-color',
      disable: '--disable-color',
    }))

    expect(result.current).toEqual({
      disable: undefined,
      error: undefined,
      info: undefined,
      primary: undefined,
      secondary: undefined,
      success: undefined,
      warning: undefined,
    })
  })
})
