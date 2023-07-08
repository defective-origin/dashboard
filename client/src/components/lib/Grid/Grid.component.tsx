import React from 'react'
import MuiGrid, { GridProps as MuiGridProps } from '@mui/material/Grid'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Grid.module.scss'

export type GridProps = MuiGridProps & {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Grid />
 */
export function Grid(props: GridProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Grid, className)

  return <MuiGrid className={_className} container {...otherProps}>{children}</MuiGrid>
}

Grid.displayName = 'Grid'

Grid.Item = Grid

export default Grid
