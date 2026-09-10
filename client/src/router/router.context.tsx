import React, { useMemo } from 'react'
import {
  RouterProvider as RrdRouterProvider,
  RouterProviderProps as RrdRouterProviderProps,
} from 'react-router-dom'

// ---| self |---
import { initAppRoutes } from './router.conf'

export { createMemoryRouter } from 'react-router-dom'
export type RouterProviderProps = Partial<RrdRouterProviderProps>

/**
 * Setup RouterProvider context.
 *
 * How to use
 * @example
 * <RouterProvider />
 */
export function RouterProvider(props: RouterProviderProps) {
  const { router, ...otherProps } = props

  const config = useMemo(() => {
    if (router) return router

    return initAppRoutes()
  }, [router])

  return <RrdRouterProvider router={config} {...otherProps} />
}

RouterProvider.displayName = 'RouterProvider'

export default RouterProvider

