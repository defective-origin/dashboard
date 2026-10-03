import React from 'react'

// ---| core |---
import { cn, react } from 'tools'

// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './Aside.module.scss'

export type AsideProps = BlockProps

/**
 * Component description.
 * @example
 * <Aside />
 */
export function Aside(props: AsideProps) {
  const { area = 'left', children, className, ...otherProps } = props

  return <Block as='aside' className={cn(css.Aside, className)} area={area} {...otherProps}>{children}</Block>
}

Aside.displayName = 'Aside'

export default react.attachOverrides(Aside, {
  Left: { area: 'left' },
  Right: { area: 'right' },
}, {
  memoize: true,
})
