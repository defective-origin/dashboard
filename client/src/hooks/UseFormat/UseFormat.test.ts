// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useFormat from './UseFormat.hook'


describe('[useFormat] hook', () => {
  const FORMAT_MAP = {
    uppercase: (value: string) => value.toUpperCase(),
    lowercase: (value: string) => value.toLowerCase(),
  }

  it('should return converted value', () => {
    const { result } = renderHook(() => useFormat('StRiNg', FORMAT_MAP, { format: 'uppercase', placeholder: 'UNKNOWN' }))

    expect(result.current).toEqual('STRING')
  })

  it('should return default placeholder if value is empty', () => {
    const { result } = renderHook(() => useFormat(null, FORMAT_MAP, { format: 'uppercase', placeholder: true }))

    expect(result.current).toEqual('unknown')
  })

  it('should return custom placeholder if value is empty', () => {
    const { result } = renderHook(() => useFormat(undefined, FORMAT_MAP, { format: 'uppercase', placeholder: 'CUSTOM PLACEHOLDER' }))

    expect(result.current).toEqual('CUSTOM PLACEHOLDER')
  })
})
