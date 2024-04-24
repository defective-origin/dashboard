import React from 'react'

// ---| core |---
import { react } from 'tools'
import { Size } from 'theme'

// ---| components |---
// ---| self |---
import useLayout, { LayoutOptions } from './Layout.hook'

export type LayoutSpace = Size
export type LayoutProps<E extends React.ElementType = React.ElementType> = react.CustomTagProps<LayoutOptions, E>

/**
 * Grid orientation component.
 * Allows to work with Grid items.
 *
 * How to use
 * @example
 * <Layout />
 */
export function Layout<E extends React.ElementType = 'div'>(props: LayoutProps<E>): JSX.Element | null {
  const { as: Tag = 'div', ...layoutProps } = useLayout(props)

  return <Tag {...layoutProps} />
}

Layout.displayName = 'Layout'

export default Layout
