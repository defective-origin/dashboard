import { useState, useMemo, useCallback } from 'react'

// ---| core |---
import { useMode } from 'hooks'

export type Theme = 'light' | 'dark'

export type AccountUser = object
export type AccountSettings = {
  theme: Theme
}

export type AccountReturnOptions = {
  user: null | AccountUser
  settings: null | AccountSettings
  //actions
  login: () => void,
  logout: () => void,
  // selectors
  isAuthorized: () => boolean
  theme: () => Theme
  isTheme: (value: Theme) => boolean
  toggleTheme: () => void
}

// TODO: move to API
/**
 * Hook descriptions
 *
 * @example
 * const options = useAccount(conf)
 */
export const useAccount = (): AccountReturnOptions => {
  const [user, setUser] = useState<AccountUser | null>(null)
  const [settings, setSettings] = useState<AccountSettings | null>(null)

  const login = useCallback(() => setUser({}), [])
  const logout = useCallback(() => setUser(null), [])
  const isAuthorized = useCallback(() => !!user, [user])
  const isTheme = useCallback((value: Theme) => settings?.theme === value, [settings?.theme])
  const theme = useCallback(() => settings?.theme ?? 'light', [settings?.theme])
  const toggleTheme = useCallback(() => {
    const theme = isTheme('dark') ? 'light': 'dark'

    setSettings((current) => ({ ...current, theme }))
  }, [isTheme])

  useMode(theme())

  return useMemo<AccountReturnOptions>(
    () => ({ user, settings, toggleTheme, theme, isTheme, login, logout, isAuthorized }),
    [user, settings, toggleTheme, theme, isTheme, login, logout, isAuthorized],
  )
}

export default useAccount
