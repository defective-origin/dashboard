import React from 'react'
import { Router as ReachRouter, RouterProps } from '@reach/router'

// ---| self |---
import css from './RouterProvider.module.scss'

export type RouterProviderProps = React.PropsWithChildren

export function RouterProvider(props: RouterProviderProps): JSX.Element {
  const { children } = props

  return <>{children}</>
}

RouterProvider.displayName = 'RouterProvider'


export default RouterProvider

export type Router = RouterProps & React.HTMLProps<HTMLDivElement>

export const Router = (props: Router) => <ReachRouter className={css.Router} {...props as any} />
Router.displayName = 'Router'
