import { useLayoutEffect } from 'react'
import useType, { TypeHandler, TypeOptions, TypeReturnOptions } from './UseType.hook'

export type CounterOptions = TypeOptions<number> & {
  step?: number
  min?: number
  max?: number
  round?: boolean
}

export type CounterReturnOptions = TypeReturnOptions<number, CounterOptions>
  & TypeHandler<'increase', (num: number) => void>
  & TypeHandler<'decrease', (num: number) => void>
  & TypeHandler<'multiply', (num: number) => void>
  & TypeHandler<'divide', (num: number) => void>
  & TypeHandler<'divideMod', (num: number) => void>

export const COUNTER_DEFAULT_VALUE = 0

/**
 * Save counter with stepper, max and min value.
 *
 * @example
 * const copyCounter = useCounter(1)
 * 
 *
 * // step forward
 * copyCounter.increase()
 * copyCounter.increase(5)
 *
 * // step back
 * copyCounter.decrease()
 * copyCounter.decrease(5)
 *
 * // multiply
 * copyCounter.multiply()
 * copyCounter.multiply(5)
 *
 * // divide
 * copyCounter.divide()
 * copyCounter.divide(5)
 *
 * // divideMod
 * copyCounter.divideMod()
 * copyCounter.divideMod(5)
 *
 * // change value
 * copyCounter.change(5)
 *
 * // restore init value
 * copyCounter.reset()
 *
 * // for each handler you have the same named  function with 'Silent' postfix
 * // which doesn't call rerender
 * copyCounter.increaseSilent()
 * copyCounter.decreaseSilent()
 * copyCounter.changeSilent()
 * copyCounter.resetSilent()
 */
export function useCounter(init = COUNTER_DEFAULT_VALUE, options: CounterOptions = {}): CounterReturnOptions {
  const updatedOptions = { step: 1, clear: COUNTER_DEFAULT_VALUE, ...options }
  const ref = useType(init, updatedOptions) as CounterReturnOptions

  // extend functionality
  useLayoutEffect(() => {
    // handlers
    ref.registerHandler('increase', (val, num = updatedOptions.step) => val + num)
    ref.registerHandler('decrease', (val, num = updatedOptions.step) => val - num)
    ref.registerHandler('multiply', (val, num = updatedOptions.step) => val * num)
    ref.registerHandler('divide', (val, num = updatedOptions.step) => val / num)
    ref.registerHandler('divideMod', (val, num = updatedOptions.step) => val % num)

    // formats
    ref.registerFormat('min', (val, min: number) => Math.max(val, min))
    ref.registerFormat('max', (val, max: number) => Math.min(val, max))
    ref.registerFormat('round', (val) => Math.round(val))
  }, [ref])

  return ref
}

export default useCounter
