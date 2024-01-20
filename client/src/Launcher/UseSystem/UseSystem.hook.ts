import { useMemo } from 'react'

// ---| self |---
import useHotKeys, { UseHotKeysReturnOptions } from './UseHotKeys'


export type UseSystemReturnOptions = {
  hotkeys: UseHotKeysReturnOptions
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useSystem(conf)
 */
export const useSystem = (): UseSystemReturnOptions => {
  const hotkeys = useHotKeys()

  return useMemo(() => ({ hotkeys }), [hotkeys])
}

export default useSystem
