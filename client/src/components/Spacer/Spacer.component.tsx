import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| self |---
import css from './Spacer.module.scss'

export type SpacerProps = {
  className?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Spacer />
 */
export function Spacer(props: SpacerProps): JSX.Element {
  const { className } = props
  const _className = cn(css.Spacer, className)

  return <div className={_className} />
}

Spacer.displayName = 'Spacer'

export default Spacer
