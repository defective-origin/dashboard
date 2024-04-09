import { useState, useMemo } from 'react'

// ---| core |---
import { useFunc, useMode } from 'hooks'

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

  const login = useFunc(() => setUser({}))
  const logout = useFunc(() => setUser(null))
  const isAuthorized = useFunc(() => !!user)
  const isTheme = useFunc((value: Theme) => settings?.theme === value)
  const theme = useFunc(() => settings?.theme ?? 'light')
  const toggleTheme = useFunc(() => {
    const theme = isTheme('dark') ? 'light': 'dark'

    setSettings((current) => ({ ...current, theme }))
  })

  useMode(theme())

  return useMemo<AccountReturnOptions>(
    () => ({ user, settings, toggleTheme, theme, isTheme, login, logout, isAuthorized }),
    [user, settings, toggleTheme, theme, isTheme, login, logout, isAuthorized],
  )
}

export default useAccount
