import { nil } from 'tools'

export type Formatter<V> = (value: V) => React.ReactNode

export type FormatOptions<K extends string> = {
  format?: K
  placeholder?: boolean | React.ReactNode
}

export type FormatReturnOptions = React.ReactNode

/**
 * Convert value by formatted map.
 *
 * @example
 * const FORMAT_MAP = {
 *  uppercase: (value) => value.toUpperCase(),
 *  lowercase: (value) => value.toLowerCase(),
 * }
 *
 * const content = useFormat(value, FORMAT_MAP, { format: 'uppercase', placeholder: 'UNKNOWN' })
 */
export const useFormat = <V, K extends string>(
  value: React.ReactNode,
  map: Record<K, Formatter<V>>,
  options: FormatOptions<K> = {},
): FormatReturnOptions => {
  const { format, placeholder } = options

  if (nil.isNil(value) && placeholder) {
    return typeof placeholder === 'boolean' ? 'unknown' : placeholder
  }

  return nil.isNil(value) || !format ? value : map[format](value as V)
}

export default useFormat
