import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { Direction, Size } from 'theme'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import './Block.module.scss'

export type BlockSpace = Size
export type BlockDirection = Direction

export type BlockOptions = {
  gap?: BlockSpace
  padding?: BlockSpace
  margin?: BlockSpace
  direction?: BlockDirection
  grow?: React.CSSProperties['flexGrow']
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
  stretch?: boolean
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
}

export type BlockReturnOptions<O extends object, E extends BlockOptions = BlockOptions> = O & {
  className: string
  children?: React.ReactNode
  style: React.CSSProperties
  options: E
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useBlock(conf)
 */
export const useBlock = <O extends object>(options: O & BlockOptions): BlockReturnOptions<O> => {
  const {
    gap,
    padding,
    margin,
    direction = 'y',
    grow,
    align,
    justify,
    stretch,
    content,
    children = content,
    className,
    style = {},
    ...otherOptions
  } = options

  return useMemo(() => ({
    ...otherOptions,
    children,
    className: cn({
      [`d--${direction}`]: direction,
      [`p--${padding}`]: padding,
      [`m--${margin}`]: margin,
      [`g--${gap}`]: gap,
      stretch: stretch,
    }, className),
    style: {
      alignItems: align,
      justifyContent: justify,
      flexGrow: grow,
      ...style,
    },
    options: { gap, padding, margin, direction, grow, align, justify, stretch, content, children, style },
  }) as BlockReturnOptions<O>,
  [align, children, className, content, direction, gap, grow, justify, margin, otherOptions, padding, stretch, style],
  )
}

export default useBlock
