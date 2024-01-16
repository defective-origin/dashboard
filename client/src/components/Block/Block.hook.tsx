import React, { useMemo } from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './Block.module.scss'

export type BlockSpace = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type BlockDirection = 'x' | 'y' | 'xy'

export type UseBlockOptions = {
  gap?: BlockSpace
  padding?: BlockSpace
  margin?: BlockSpace
  direction?: BlockDirection
  grow?: React.CSSProperties['flexGrow']
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
  stretch?: boolean
  style?: React.CSSProperties
}

export type UseBlockReturnOptions<O extends object> = {
  className: string
  style: React.CSSProperties
  options: UseBlockOptions
  otherOptions: Omit<O, keyof UseBlockOptions>
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useBlock(conf)
 */
export const useBlock = <O extends object>(options: UseBlockOptions & O): UseBlockReturnOptions<O> => {
  const {
    gap,
    padding,
    margin,
    direction = 'y',
    grow,
    align,
    justify,
    stretch,
    style = {},
    ...otherOptions
  } = options

  return useMemo(() => ({
    className: cn({
      [`d--${direction}`]: direction,
      [`p--${padding}`]: padding,
      [`m--${margin}`]: margin,
      [`g--${gap}`]: gap,
      'stretch': stretch,
    }),
    style: {
      alignItems: align,
      justifyContent: justify,
      flexGrow: grow,
      ...style,
    },
    options: { gap, padding, margin, direction, grow, align, justify, stretch, style },
    otherOptions,
  }), [align, direction, gap, grow, justify, margin, otherOptions, padding, stretch, style])
}

export default useBlock
