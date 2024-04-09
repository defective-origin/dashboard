import { useMemo, useState } from 'react'
import { useFunc } from 'hooks'

export type HotKeysReturnOptions = {
  add: (key: string, handler: () => void) => void
  remove: (key: string) => void
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useHotKeys(conf)
 */
export const useHotKeys = (): HotKeysReturnOptions => {
  const [hotkeys, setHotkeys] = useState<Record<string, () => void>>({})

  const add = useFunc((key: string, handler: () => void) => setHotkeys({ ...hotkeys, [key]: handler }))

  const remove = useFunc((key: string) => {
    const keys = { ...hotkeys }

    delete keys[key]

    setHotkeys(keys)
  })

  return useMemo(() => ({ add, remove }), [add, remove])
}

export default useHotKeys
