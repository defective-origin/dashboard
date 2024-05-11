// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useForm from './UseForm.hook'


describe('[useForm] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useForm())

    expect(result.current).toEqual(null)
  })
})
