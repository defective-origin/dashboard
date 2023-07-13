/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useLayoutEffect, useRef } from 'react'
import useStateful, { StatefulReturnOptions, getValue } from './UseStateful.hook'

export type TypeHandler<
  Name extends string,
  Handler extends (...args: any[]) => void,
> = Record<Name | `${Name}Silent`, (...args: Parameters<Handler>) => void>

export type Formatter<T, O = any> = (val: T, option: O) => T

export type TypeOptions<S> = {
  clear?: S
  format?: Formatter<S, TypeOptions<S>>
}

export type TypeReturnOptions<S, O extends TypeOptions<S> = TypeOptions<S>> = StatefulReturnOptions<S>
  & TypeHandler<'clear', () => void>
  & {
  registerHandler: (name: string, handler: (val: S, ...args: any[]) => S) => void

  registerFormat(handler: Formatter<S>): void;
  registerFormat(name: keyof O, handler: Formatter<S>): void;

  isChanged: () => boolean

  [key: string]: any
}

/**
 * Allows to save value and change it without rerender.
 *
 * @example
 * const state = useType(someValue)
 * const state = useType(someValue, options) // subscribe on deps changes
 *
 * // change with rerendering
 * state.change(newValue)
 * state.change((prevValue) => prevValue + newValue)
 *
 * // change initial value with ref reinitialization if changes deps changes
 * state.change(newValue, [newValue])
 *
 * // change only ref value
 * state.changeSilent(newValue)
 * state.changeSilent((prevValue) => prevValue + newValue)
 *
 * // reset ref value with state value
 * state.sync()
 *
 * // reset value
 * state.reset()
 *
 * // get last valid value
 * state.current
 *
 * // get registered state
 * state.value
 *
 * // extend functionality
 * export type TextOptions = TypeOptions<string> & {
 *   trim?: boolean
 *   lower?: boolean
 *   upper?: boolean
 *   remove?: string | RegExp
 * }
 *
 * export type TextReturnOptions = TypeReturnOptions<string, TextOptions>
 *   & TypeHandler<'concat', (...args: Parameters<String['concat']>) => void>
 *   & TypeHandler<'replace', (...args: Parameters<String['replace']>) => void>
 *   & TypeHandler<'replaceAll', (...args: Parameters<String['replaceAll']>) => void>
 *   & TypeHandler<'slice', (...args: Parameters<String['slice']>) => void>
 *   & TypeHandler<'toLowerCase', () => void>
 *   & TypeHandler<'toUpperCase', () => void>
 *   & TypeHandler<'trim', () => void>
 *   & {
 *    equal: (val) => boolean
 *   }
 *
 * export function useText(init = TEXT_DEFAULT_VALUE, options: TextOptions = {}): TextReturnOptions {
 *   const updatedOptions = { clear: TEXT_DEFAULT_VALUE, ...options }
 *   // all options for formatters should be  passed via options
 *   const ref = useType(init, updatedOptions) as TextReturnOptions
 *
 *   // extend functionality
 *   useLayoutEffect(() => {
 *     // extra
 *     ref.equal = (val) => val === ref.current
 *
 *     // handlers
 *     ref.registerHandler('toLowerCase', (val) => val.toLowerCase())
 *     ref.registerHandler('toUpperCase', (val) => val.toUpperCase())
 *     ref.registerHandler('trim', (val) => val.trim())
 *
 *     // formats
 *     ref.registerFormat('trim', (val) => val.trim())
 *     ref.registerFormat('lower', (val) => val.toLowerCase())
 *     ref.registerFormat('upper', (val) => val.toUpperCase())
 *     ref.registerFormat('remove', (val, remove) => val.replace(remove, ''))
 *   }, [ref])
 *
 *   return ref
 * }
 */
export const useType = <S, O extends TypeOptions<S>>(init: S, options = {} as O): TypeReturnOptions<S, O> => {
  const formatsRef = useRef<((val: S) => S)[]>([])
  const formatValue = useCallback((val: S) => {
    const { format } = options
    const currentValue = format ? format(val, options) : val

    return formatsRef.current
      .reduce((acc, handler) => handler?.(acc) ?? acc, currentValue)
  }, [options])
  const ref = useStateful(formatValue(init)) as TypeReturnOptions<S, O> & { [key: string]: any }

  // override
  useLayoutEffect(() => {
    const { change, changeSilent } = ref

    ref.change = (val) => change(formatValue(getValue(val, ref.current)))
    ref.changeSilent = (val) => changeSilent(formatValue(getValue(val, ref.current)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  // extend functionality
  useLayoutEffect(() => {
    ref.registerHandler = (name, handler) => {
      ref[name] = (...args: any[]) => ref.change((val) => handler(val, ...args))
      ref[`${name}Silent`] = (...args: any[]) => ref.changeSilent((val) => handler(val, ...args))
    }

    ref.registerHandler('clear', () => options.clear ?? init)


    ref.registerFormat = (arg0, arg1?: Formatter<S>) => {
      const opt = typeof arg0 === 'string' ? options[arg0] : options
      const handler = arg1 ? arg1 : arg0 as Formatter<S>

      if (typeof opt !== 'undefined') {
        formatsRef.current.push((val) => handler(val, opt))
      }
    }

    ref.isChanged = () => {
      if (init === 'object') {
        return Object.keys((init as any))
          .some((key) => (ref.current as any)[key] !== (init as any)[key])
      }

      return ref.current !== init
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return ref
}

export default useType
