import React from 'react'

// ---| core |---
import { cn, react } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/layouts/Layout'

// ---| self |---
import css from './Aside.module.scss'

export type AsideProps = LayoutProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <Aside />
 */
export function Aside(props: AsideProps) {
  const { area = 'left', children, className, ...otherProps } = props
  const _className = cn(css.Aside, className)

  return <Layout className={_className} area={area} v='y' {...otherProps}>{children}</Layout>
}

Aside.displayName = 'Aside'

export default react.attachOverrides(Aside, {
  Left: { area: 'left' },
  Right: { area: 'right' },
}, {
  memoize: true,
})
