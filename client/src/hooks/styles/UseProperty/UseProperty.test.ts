// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useProperty from './UseProperty.hook'


describe('[useProperty] hook', () => {
  it('should return variable value', () => {
    const { result } = renderHook(() => useProperty({
      defaultValue: 'default value',
      defaultProperty: '--primary-color',
    }))

    expect(result.current()).toEqual('default value')
  })
})
