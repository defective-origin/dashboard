import React, { useMemo } from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import { UseBlockOptions, UseBlockReturnOptions, useBlock } from 'components/Block'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './Layout.module.scss'

export type LayoutVariant = 'cards' | 'row' | 'rows' | 'column' | 'columns' | 'header' | 'footer' | 'left-aside' | 'right-aside' | 'grid'

export type UseLayoutOptions = UseBlockOptions & {
  v?: LayoutVariant
  areas?: React.CSSProperties['gridTemplateAreas']
  columns?: number,
  rows?: number,
}

export type UseLayoutReturnOptions<O extends object> = UseBlockReturnOptions<O, UseLayoutOptions>

/**
 * Hook descriptions
 *
 * @example
 * const options = useLayout(conf)
 */
export const useLayout = <O extends object>(options: UseLayoutOptions & O): UseLayoutReturnOptions<O> => {
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
  }) as UseLayoutReturnOptions<O>,
  [otherOptions, v, areas, className, columns, rows, style],
  )
}

export default useLayout
