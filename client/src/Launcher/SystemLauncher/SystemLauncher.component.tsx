import React, { useMemo, useState } from 'react'
import { Router as ReachRouter, RouteComponentProps, RouterProps } from '@reach/router'
import i18next, { I18nextProvider, Languages, t } from 'locale'

// ---| self |---
import {
  SystemLauncherContext,
  SystemLauncherOptions,
  DEFAULT_SYSTEM_LAUNCHER_STATE,
} from './SystemLauncher.context'
import css from './SystemLauncher.module.scss'

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
  const [current, setCurrent] = useState(DEFAULT_SYSTEM_LAUNCHER_STATE)

  const options = useMemo<SystemLauncherOptions>(() => ({
    ...current,
    languages: i18next.languages as Languages[],
    t,
    changeLanguage: (language) => {
      // TODO: analytics.register({ name: 'Language', value: language })
      setCurrent((state) => ({ ...state, language }))
      i18next.changeLanguage(language)
    },
    // TODO: click analytics.register({ name: 'Hotkey', value: Hotkey })
    addHotkey: (key, handler) => setCurrent((state) => ({ ...state, hotkeys: { ...state.hotkeys, [key]: handler } })),
    removeHotkey: (key) => setCurrent((state) => {
      const hotkeys = { ...state.hotkeys }

      delete hotkeys[key]

      return { ...state, hotkeys }
    }),
  }), [current])



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



export type RouteProps = RouteComponentProps

export type Router = RouterProps & React.HTMLProps<HTMLDivElement>

export const Router = (props: Router) => <ReachRouter className={css.Router} {...props as RouterProps} />
Router.displayName = 'Router'
