import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Direction, Size } from 'theme'

// ---| components |---
import { ItemOptions, ItemReturnOptions, useItem } from 'components/layouts/Item'

// ---| self |---
import './Block.module.scss'

export type BlockSpace = Size
export type BlockVariant = Direction | 'cards'

export type BlockOptions = ItemOptions & {
  v?: BlockVariant
  /** align items */
  aligns?: React.CSSProperties['alignItems']
  /** justify content */
  justifies?: React.CSSProperties['justifyContent']
  /** flex direction */
  direction?: React.CSSProperties['flexDirection']
  /** flex wrap */
  wrap?: React.CSSProperties['flexWrap']
  /** flex flow */
  flow?: React.CSSProperties['flexFlow']
}

export type BlockReturnOptions<O extends object> = ItemReturnOptions<O>

/**
 * Hook descriptions
 *
 * @example
 * const options = useBlock(conf)
 */
export const useBlock = <O extends object>(options: O & BlockOptions): BlockReturnOptions<O> => {
  const {
    v = 'y',
    aligns,
    justifies,
    direction,
    wrap,
    flow,
    children,
    className,
    style,
    ...otherOptions
  } = useItem(options)

  return {
    ...otherOptions,
    children,
    className: cn('block', {
      [`block--${v}`]: v,
    }, className),
    style: {
      alignItems: aligns,
      justifyContent: justifies,
      flexDirection: direction,
      flexWrap: wrap,
      flexFlow: flow,
      ...style,
    },
  } as BlockReturnOptions<O>
}

export default useBlock
