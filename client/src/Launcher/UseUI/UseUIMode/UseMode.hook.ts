import { useCallback, useMemo, useState } from 'react'

export type UIMode = 'view' | 'edit'

export type UseModeReturnOptions = {
  mode: UIMode
  is: (value: UIMode) => boolean,
  toggle: () => void,
}


/**
 * Hook descriptions
 *
 * @example
 * const options = useUiMode(conf)
 */

export const useMode = (): UseModeReturnOptions => {
  const [mode, setMode] = useState<UIMode>('view')

  // TODO: (kseniya_boldak) replace by useToggler

  const is = useCallback((value: UIMode) => mode === value, [mode])
  const toggle = useCallback(() => setMode(is('edit') ? 'view': 'edit'), [is])

  return useMemo(() => ({ mode, is, toggle }), [mode, is, toggle])
}

export default useMode
