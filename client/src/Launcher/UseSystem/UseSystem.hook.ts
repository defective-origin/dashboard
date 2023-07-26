import { useMemo } from 'react'

// ---| core |---
import i18next, { Languages, changeLanguage, t } from 'locale'

// ---| common |---
import { useObject } from 'common/hooks'

export type SystemLanguage = Languages

export type SystemState = {
  language: SystemLanguage
  languages: SystemLanguage[]
  hotkeys: Record<string, () => void>
}

export const DEFAULT_SYSTEM_STATE: SystemState = {
  language: 'en',
  languages: i18next.languages as Languages[],
  hotkeys: {},
}

export type SystemActions = {
  changeLanguage: typeof changeLanguage
  addHotkey: (key: string, handler: () => void) => void
  removeHotkey: (key: string) => void
}

export type SystemSelectors = {
  t: typeof t
}

export type UseSystemReturnOptions = SystemState & SystemActions & SystemSelectors

/**
 * Hook descriptions
 *
 * @example
 * const options = useSystem(conf)
 */
export const useSystem = (): UseSystemReturnOptions | null => {
  const state = useObject(DEFAULT_SYSTEM_STATE)

  const actions = useMemo<SystemActions>(() => ({
    changeLanguage,
    addHotkey: (key, handler) => state.merge({ hotkeys: { ...state.current.hotkeys, [key]: handler } }),
    removeHotkey: (key) => {
      const hotkeys = { ...state.current.hotkeys }

      delete hotkeys[key]

      state.merge({ hotkeys })
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  const selectors = useMemo<SystemSelectors>(() => ({
    t,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo<UseSystemReturnOptions>(() => ({ ...state.current, ...actions, ...selectors }), [state.current])
}

export default useSystem
