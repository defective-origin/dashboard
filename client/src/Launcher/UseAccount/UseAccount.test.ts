// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import useAccount from './UseAccount.hook'


describe('[useAccount] hook', () => {
  it('should return options', () => {
    const { result } = renderHook(() => useAccount())

    expect(result.current).toEqual(null)
  })
})
