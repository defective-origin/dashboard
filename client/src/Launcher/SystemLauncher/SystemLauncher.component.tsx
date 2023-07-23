import React, { useMemo } from 'react'
import i18next, { I18nextProvider, Languages, t } from 'locale'

// ---| common |---
import { useObject } from 'common/hooks'

// ---| self |---
import {
  SystemLauncherContext,
  SystemLauncherActions,
  SystemLauncherOptions,
  DEFAULT_SYSTEM_LAUNCHER_STATE,
} from './SystemLauncher.context'

export type SystemLauncherProps = React.PropsWithChildren

/**
 * Setup all system context providers.
 *
 * How to use
 * @example
 * <SystemLauncher defaultProp={1} />
 */
export function SystemLauncher(props: SystemLauncherProps): JSX.Element {
  const { children } = props
  const system = useObject(DEFAULT_SYSTEM_LAUNCHER_STATE)

  // actions are separated to prevent side effects
  // if we subscribe to change dependencies. Example: useHook(val, [dep1, dep2])
  const actions = useMemo<SystemLauncherActions>(() => ({
    t,
    changeLanguage: (language) => {
      // TODO: analytics.register({ name: 'Language', value: language })
      system.merge({ language, languages: i18next.languages as Languages[] })
      i18next.changeLanguage(language)
    },
    // TODO: click analytics.register({ name: 'Hotkey', value: Hotkey })
    addHotkey: (key, handler) => system.merge({ hotkeys: { ...system.current.hotkeys, [key]: handler } }),
    removeHotkey: (key) => {
      const hotkeys = { ...system.current.hotkeys }

      delete hotkeys[key]

      system.merge({ hotkeys })
    },
  }), [system])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo<SystemLauncherOptions>(() => ({ ...system.current, ...actions }), [system.current, actions])

  return (
    <React.StrictMode>
      <SystemLauncherContext.Provider value={options} {...props}>
        <I18nextProvider i18n={i18next}>
          {children}
        </I18nextProvider>
      </SystemLauncherContext.Provider>
    </React.StrictMode>
  )
}

SystemLauncher.displayName = 'SystemLauncher'

export default SystemLauncher
