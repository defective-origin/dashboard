import { useLayoutEffect } from 'react'
import useType, { TypeHandler, TypeOptions, TypeReturnOptions } from './UseType.hook'

export type TextOptions = TypeOptions<string> & {
  trim?: boolean
  lower?: boolean
  upper?: boolean
  remove?: string | RegExp
}

export type TextReturnOptions = TypeReturnOptions<string, TextOptions>
  & TypeHandler<'concat', (...args: Parameters<string['concat']>) => void>
  & TypeHandler<'replace', (...args: Parameters<string['replace']>) => void>
  & TypeHandler<'slice', (...args: Parameters<string['slice']>) => void>
  & TypeHandler<'toLowerCase', () => void>
  & TypeHandler<'toUpperCase', () => void>
  & TypeHandler<'trim', () => void>

export const TEXT_DEFAULT_VALUE = ''

export function useText(init = TEXT_DEFAULT_VALUE, options: TextOptions = {}): TextReturnOptions {
  const updatedOptions = { clear: TEXT_DEFAULT_VALUE, ...options }
  const ref = useType(init, updatedOptions) as TextReturnOptions

  // extend functionality
  useLayoutEffect(() => {
    // handlers
    ref.registerHandler('concat', (val, ...args: Parameters<string['concat']>) => val.concat(...args))
    ref.registerHandler('replace', (val, ...args: Parameters<string['replace']>) => val.replace(...args))
    ref.registerHandler('slice', (val, ...args: Parameters<string['slice']>) => val.slice(...args))
    ref.registerHandler('toLowerCase', (val) => val.toLowerCase())
    ref.registerHandler('toUpperCase', (val) => val.toUpperCase())
    ref.registerHandler('trim', (val) => val.trim())

    // formats
    ref.registerFormat('trim', (val) => val.trim())
    ref.registerFormat('lower', (val) => val.toLowerCase())
    ref.registerFormat('upper', (val) => val.toUpperCase())
    ref.registerFormat('remove', (val, remove) => val.replace(remove, ''))
  }, [ref])

  return ref
}

export default useText
