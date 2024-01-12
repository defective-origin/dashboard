import { useMemo } from 'react'

// ---| core |---
import { UseLocaleReturnOptions, useLocale } from 'locale'

// ---| self |---
import useHotKeys, { UseHotKeysReturnOptions } from './UseHotKeys'


export type UseSystemReturnOptions = UseLocaleReturnOptions & {
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
  const locale = useLocale()

  return useMemo(() => ({ hotkeys, ...locale }), [hotkeys, locale])
}

export default useSystem
