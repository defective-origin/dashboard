import React from 'react'

// ---| core |---
import { cn, react } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './Aside.module.scss'

export type AsideProps = BlockProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <Aside />
 */
export function Aside(props: AsideProps): JSX.Element {
  const { area = 'left', children, className, ...otherProps } = props
  const _className = cn(css.Aside, className)

  return <Block className={_className} area={area} {...otherProps}>{children}</Block>
}

Aside.displayName = 'Aside'

export default react.attachOverrides(Aside, {
  Left: { area: 'left' },
  Right: { area: 'right' },
}, {
  memoize: true,
})
