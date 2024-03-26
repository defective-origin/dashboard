import { useEffect } from 'react'

/**
 * Trigger callback functions when component unmounts
 *
 * @example
 * useUnmount(() => console.log('unmounted'))
 */
export const useUnmount = (handler: () => void): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => handler(), [])
}

export default useUnmount
