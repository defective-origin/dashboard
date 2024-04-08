// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useProperties from './UseProperties.hook'

describe('[useProperties] hook', () => {
  it('should return variable map', () => {
    const { result } = renderHook(() => useProperties({
      ref: document.body,
      margin: 'margin-top',
      background: 'background-color',
    }))

    expect(result.current).toEqual({
      margin: '8px',
      background: 'rgba(0, 0, 0, 0)',
      ref: {
        current: document.body,
      },
    })
  })
})
