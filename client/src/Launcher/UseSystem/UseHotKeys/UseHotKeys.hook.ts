import { useCallback, useMemo, useState } from 'react'

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

  const add = useCallback((key: string, handler: () => void) => setHotkeys({ ...hotkeys, [key]: handler }), [hotkeys])

  const remove = useCallback((key: string) => {
    const keys = { ...hotkeys }

    delete keys[key]

    setHotkeys(keys)
  }, [hotkeys])

  return useMemo(() => ({ add, remove }), [add, remove])
}

export default useHotKeys
