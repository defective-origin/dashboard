import { useLayoutEffect } from 'react'
import useType, { TypeHandler, TypeOptions, TypeReturnOptions } from './UseType.hook'

export type TogglerReturnOptions = TypeReturnOptions<boolean>
  & TypeHandler<'toggle', () => void>
  & TypeHandler<'turnOff', () => void>
  & TypeHandler<'turnOn', () => void>
  & TypeHandler<'turn', (value: any) => void>
  & {
    isOn: () => boolean
    isOff: () => boolean
  }

export type TogglerOptions = TypeOptions<boolean>

export const TOGGLER_DEFAULT_VALUE = false

/**
 * Toggler for manipulating with boolean flag.
 *
 * @example
 * // any value will be converted into boolean value
 * const modalToggler = useToggler(true)
 * const modalToggler = useToggler(1)
 * const modalToggler = useToggler({})
 * const modalToggler = useToggler('')
 *
 * // switch value
 * modalToggler.toggle()
 * modalToggler.turnOn()
 * modalToggler.turnOff()
 *
 * // change value
 * modalToggler.turn(true)
 * modalToggler.turn({})
 *
 * // check value
 * modalToggler.isOn(true)
 * modalToggler.isOff()
 * modalToggler.current
 * modalToggler.value
 * 
 * // for each handler you have the same named  function with "Silent" postfix
 * // which doesn't call rerender
 * copyCounter.toggleSilent()
 * copyCounter.turnOnSilent()
 * copyCounter.turnOffSilent()
 * copyCounter.resetSilent()
 */
export function useToggler(init = TOGGLER_DEFAULT_VALUE, options: TogglerOptions = {}): TogglerReturnOptions {
  const updatedOptions = { clear: TOGGLER_DEFAULT_VALUE, ...options }
  const ref = useType(init, updatedOptions) as TogglerReturnOptions

  // extend functionality
  useLayoutEffect(() => {
    // extra
    ref.isOn = () => ref.current
    ref.isOff = () => !ref.current

    // handlers
    ref.registerHandler('toggle', (flag) => !flag)
    ref.registerHandler('turn', (_, flag) => !!flag)
    ref.registerHandler('turnOn', () => true)
    ref.registerHandler('turnOff', () => false)
  }, [ref])

  return ref
}

export default useToggler
