import React, { useMemo } from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import { BlockOptions, BlockReturnOptions, useBlock } from 'components/Block'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './Layout.module.scss'

export type LayoutVariant = 'cards' | 'row' | 'rows' | 'column' | 'columns' | 'header' | 'footer' | 'left-aside' | 'right-aside' | 'grid'

export type LayoutOptions = BlockOptions & {
  v?: LayoutVariant
  areas?: React.CSSProperties['gridTemplateAreas']
  columns?: number,
  rows?: number,
}

export type LayoutReturnOptions<O extends object> = BlockReturnOptions<O, LayoutOptions>

/**
 * Hook descriptions
 *
 * @example
 * const options = useLayout(conf)
 */
export const useLayout = <O extends object>(options: LayoutOptions & O): LayoutReturnOptions<O> => {
  const { className, v = 'rows', areas, columns, rows, style, ...otherOptions } = useBlock(options)

  return useMemo(() => ({
    ...otherOptions,
    className: cn('layout', {
      [`layout--${v}`]: !areas,
    }, className),
    style: {
      gridTemplateAreas: areas,
      gridTemplateColumns: columns && `repeat(${columns}, 1fr)`,
      gridTemplateRows: rows && `repeat(${rows}, 1fr)`,
      ...style,
    },
    options: { v, areas, columns, rows },
  }) as LayoutReturnOptions<O>,
  [otherOptions, v, areas, className, columns, rows, style],
  )
}

export default useLayout