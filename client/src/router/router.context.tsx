import React from 'react'
import {
  RouterProvider as RrdRouterProvider,
  RouterProviderProps as RrdRouterProviderProps,
} from 'react-router-dom'

// ---| self |---
import { APP_ROUTES } from './router.conf'

export type RouterProviderProps = Partial<RrdRouterProviderProps>

/**
 * Setup RouterProvider context.
 *
 * How to use
 * @example
 * <RouterProvider />
 */
export function RouterProvider(props: RouterProviderProps) {
  const { router = APP_ROUTES, ...otherProps } = props

  return <RrdRouterProvider router={router} {...otherProps} />
}

RouterProvider.displayName = 'RouterProvider'

export default RouterProvider

