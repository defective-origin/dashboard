import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Divider from 'components/lib/Divider'
import Spacer from 'components/Spacer'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Block.module.scss'

export type BlockGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BlockDirectionType = 'x' | 'y' | 'xy'

export type BlockProps = {
  className?: string
  children?: React.ReactNode
  gap?: BlockGap
  direction?: BlockDirectionType
  grow?: React.CSSProperties['flexGrow']
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Block />
 */
export function Block(props: BlockProps): JSX.Element | null {
  const { grow, align, justify, gap, direction = 'x', children, className, ...otherProps } = props
  const _className = cn(css.Block, css[direction], gap && `gap--${gap}`, className)
  const style: React.CSSProperties = { alignItems: align, justifyContent: justify, flexGrow: grow }

  return (
    <div className={_className} {...otherProps} style={style}>
      {children}
    </div>
  )
}

Block.displayName = 'Block'

Block.Divider = Divider
Block.Spacer = Spacer

export default Block
