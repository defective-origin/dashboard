// ---| tests |---
import { act, renderHook } from '@testing-library/react'

// ---| self |---
import useToggler from './UseToggler.hook'


describe('[useToggler] hook', () => {
  it('should be off by default', () => {
    const { result } = renderHook(() => useToggler())

    expect(result.current.isOff).toEqual(true)
  })

  it('should work with any values', () => {
    const { result } = renderHook(() => useToggler({}))

    expect(result.current.isOn).toEqual(true)
  })

  it('should toggle state', () => {
    const { result } = renderHook(() => useToggler({}))

    act(() => { result.current.toggle() })

    expect(result.current.isOn).toEqual(true)
  })

  it('should turn on state', () => {
    const { result } = renderHook(() => useToggler())

    act(() => { result.current.on() })

    expect(result.current.isOn).toEqual(true)
  })

  it('should turn off state', () => {
    const { result } = renderHook(() => useToggler(true))

    act(() => { result.current.off() })

    expect(result.current.isOff).toEqual(true)
  })

  it('should set state', () => {
    const { result } = renderHook(() => useToggler())

    act(() => { result.current.turn(true) })

    expect(result.current.isOn).toEqual(true)
  })
})
