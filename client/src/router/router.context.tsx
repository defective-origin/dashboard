import React from 'react'
import { RouterProvider as RrdRouterProvider, RouterProviderProps as RrdRouterProviderProps } from 'react-router-dom'

// ---| self |---
import { APP_ROUTES } from './router.conf'

export type RouterProviderProps = React.PropsWithChildren & Partial<RrdRouterProviderProps>

/**
 * Setup RouterProvider context.
 *
 * How to use
 * @example
 * <RouterProvider defaultProp={1} />
 */
export function RouterProvider(props: RouterProviderProps): JSX.Element {
  const { children, ...otherProps } = props

  return (
    <>
      <RrdRouterProvider router={APP_ROUTES} {...otherProps} />

      {children}
    </>
  )
}

RouterProvider.displayName = 'RouterProvider'

export default RouterProvider

