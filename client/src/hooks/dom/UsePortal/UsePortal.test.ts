// ---| tests |---
import { renderHook } from '@testing-library/react-hooks'

// ---| self |---
import usePortal from './UsePortal.hook'


describe('[usePortal] hook', () => {
  it('should return react portal', () => {
    const { result } = renderHook(() => usePortal('Content', { ref: document.body }))

    expect(result.current).toMatchObject({
      children: 'Content',
      containerInfo: document.body,
      implementation: null,
      key: null,
    })
  })

  it('should return react content if portal is disabled', () => {
    const { result } = renderHook(() => usePortal('Content', { ref: document.body, disable: true }))

    expect(result.current).toEqual('Content')
  })
})
