import React, { useMemo } from 'react'
import { Router as ReachRouter, RouteComponentProps, RouterProps } from '@reach/router'
import { StyledEngineProvider } from '@mui/material/styles'
import i18next, { I18nextProvider, Languages, t } from 'locale'

// ---| common |---
import { useObject } from 'common/hooks'

// ---| self |---
import UI, { UIProps } from './UI'
import {
  LauncherState,
  LauncherAction,
  LauncherActions,
  LauncherContext,
  LauncherOptions,
  LauncherRegisterAction,
  DEFAULT_LAUNCHER_STATE,
} from './Launcher.context'
import './Launcher.module.scss'

export type LauncherProps = React.PropsWithChildren & {
  toaster?: UIProps['toaster']
  actions?: LauncherActions
  state?: LauncherState
}

/**
 * Run all launchers with main app page.
 *
 * How to use
 * @example
 * <Launcher />
 */
export function Launcher(props: LauncherProps): JSX.Element {
  const { actions = {} as LauncherState, toaster, children } = props
  const store = useObject({ ...DEFAULT_LAUNCHER_STATE, ...props.state })
  const actionStore = useObject({} as LauncherActions)

  // actions are separated to prevent side effects
  // if we subscribe to change dependencies. Example: useHook(val, [dep1, dep2])
  useMemo(() => {
    actionStore.update = store.merge

    const register = (actions: Record<string, LauncherRegisterAction>) => {
      const actionMap = Object.keys(actions).reduce((acc, name) => {
        acc[name] = (...args) => actions[name](store, ...args)

        return acc
      }, {} as Record<string, LauncherAction>)

      actionStore.mergeSilent(actionMap)
    }

    const unregister = (actions: Record<string, LauncherRegisterAction>) => {
      actionStore.omitSilent(...Object.keys(actions))
    }

    register({ ...actions, register, unregister })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo<LauncherOptions>(() => ({ ...store.current, ...actionStore.current }), [store.current, actionStore.current])

  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <React.Suspense fallback={<h1>Loading...</h1>}>
          <LauncherContext.Provider value={options}>
            {/* injectFirst allows override Material UI's styles. */}
            <StyledEngineProvider injectFirst>
              <UI toaster={toaster}>
                { children }
              </UI>
            </StyledEngineProvider>
          </LauncherContext.Provider>
        </React.Suspense>
      </I18nextProvider>
    </React.StrictMode>
  )
}

Launcher.displayName = 'Launcher'

export default Launcher



export type RouteProps = RouteComponentProps

export type Router = RouterProps & React.HTMLProps<HTMLDivElement>

export const Router = (props: Router) => <ReachRouter className='router' {...props as RouterProps} />
Router.displayName = 'Router'
