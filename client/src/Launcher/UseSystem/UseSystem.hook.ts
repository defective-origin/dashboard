import { useMemo } from 'react'

// ---| self |---
import useHotKeys, { HotKeysReturnOptions } from './UseHotKeys'


export type SystemReturnOptions = {
  hotkeys: HotKeysReturnOptions
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useSystem(conf)
 */
export const useSystem = (): SystemReturnOptions => {
  const hotkeys = useHotKeys()

  return useMemo(() => ({ hotkeys }), [hotkeys])
}

export default useSystem
