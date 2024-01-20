import { useCallback, useMemo, useState } from 'react'

export type UITheme = 'light' | 'dark'

export type UseThemeReturnOptions = {
  theme: UITheme
  is: (value: UITheme) => boolean,
  toggle: () => void,
}


// TODO: move to 'theme' root folder?
/**
 * Hook descriptions
 *
 * @example
 * const options = useUiTheme(conf)
 */
export const useTheme = (): UseThemeReturnOptions => {
  const [theme, setTheme] = useState<UITheme>('light')

  // TODO: (kseniya_boldak) replace by useToggler

  const is = useCallback((value: UITheme) => theme === value, [theme])
  const toggle = useCallback(() => setTheme(is('dark') ? 'light': 'dark'), [is])

  return useMemo(() => ({ theme, is, toggle }), [theme, is, toggle])
}

export default useTheme
