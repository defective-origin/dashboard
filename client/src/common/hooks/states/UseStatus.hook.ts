import { useMemo } from 'react'
import { ObjectReturnOptions, useObject } from '.'
import { TypeHandler } from './UseType.hook'

export type StatusReturnOptions<T extends Record<string, boolean>> = ObjectReturnOptions<T>
  & TypeHandler<'toggle', (key: keyof T) => void>

/**
 * Allows to manipulate interdependent statuses.
 *
 * @example
 * // any value will be converted into boolean value
 * const loadingStatus = useStatus({ isLoading: false, loaded: false, failed: false })
 *
 * // change several values
 * loadingStatus.merge({ isLoading: false, failed: true })
 *
 * // toggle by status key name
 * loadingStatus.toggle('isLoading')
 * loadingStatus.toggle('loaded')
 * loadingStatus.toggle('failed')
 *
 * // restore init value
 * loadingStatus.reset()
 *
 * // flags
 * loadingStatus.isChanged()
 * loadingStatus.current.someFlag
 */
export const useStatus = <T extends Record<string, boolean>>(init: T): StatusReturnOptions<T> => {
  const ref = useObject<T>(init, { clear: init }) as StatusReturnOptions<T>

  // extend functionality
  useMemo(() => {
    ref.registerHandler('toggle', (_, key) => ({ ...init, [key]: true }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return ref
}

export default useStatus
