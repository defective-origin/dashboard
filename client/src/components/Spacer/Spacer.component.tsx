import React from 'react'
import { useTheme } from '@mui/material'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Spacer.module.scss'

export type SpacerProps = {
  className?: string
  x?: number; // multiplier of theme.spacing
  y?: number; // multiplier of theme.spacing
  basis?: number; // multiplier of theme.spacing
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Spacer />
 */
export function Spacer(props: SpacerProps): JSX.Element {
  const { x, y, basis, className, ...otherProps } = props
  const _className = cn(css.Spacer, className)
  const theme = useTheme()
  const style = {
    width: x && theme.spacing(x),
    height: y && theme.spacing(y),
    flexBasis: basis && theme.spacing(basis),
  }

  return <div className={_className} {...otherProps} style={style} />
}

Spacer.displayName = 'Spacer'

export default Spacer
