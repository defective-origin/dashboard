import React from 'react'

// ---| core |---
import { Size } from 'theme'
import { cn } from 'tools'

// ---| components |---
import { ItemOptions, ItemReturnOptions, useItem } from 'components/Item'

// ---| self |---
import './Layout.module.scss'

export type LayoutSpace = Size
export type LayoutVariant = 'board' | 'row' | 'rows' | 'column' | 'columns' | 'top' | 'bottom' | 'left' | 'right' | 'x' | 'y'
// TODO: add grid-template-columns: repeat(/* auto-fill или auto-fit */, /* размер колонки */); https://doka.guide/css/grid-guide/
// TODO: add dense

export type LayoutOptions = ItemOptions & {
  v?: LayoutVariant
  /** quantity of columns */
  columns?: number
  /** quantity of rows */
  rows?: number
  /** grid template */
  template?: string
  /** grid template areas */
  areas?: React.CSSProperties['gridTemplateAreas']
  /** place items */
  places?: React.CSSProperties['placeItems']
  /** align items */
  aligns?: React.CSSProperties['alignItems']
  /** justify items */
  justifies?: React.CSSProperties['justifyItems']
  /** grid auto flow */
  flow?: React.CSSProperties['gridAutoFlow']
  /** grid auto columns / grid auto rows */
  cell?: `${React.CSSProperties['gridAutoColumns']} / ${React.CSSProperties['gridAutoRows']}`
}

export type LayoutReturnOptions<O extends object> = ItemReturnOptions<O>

/**
 * Grid orientation component.
 * Allows to work with Grid items.
 *
 * https://doka.guide/css/grid-guide/
 *
 * @example
 * const options = useLayout(conf)
 */
export const useLayout = <O extends object>(options: LayoutOptions & O): LayoutReturnOptions<O> => {
  const {
    v,
    areas,
    aligns,
    places,
    justifies,
    template,
    flow,
    cell,
    columns,
    rows,
    className,
    style,
    ...otherOptions
  } = useItem(options)
  const auto = cell?.split('/')

  return {
    ...otherOptions,
    className: cn('layout', {
      [`layout--${v}`]: !areas && v,
    }, className),
    style: {
      placeItems: places,
      alignItems: aligns,
      justifyItems: justifies,
      gridTemplate: template,
      gridTemplateAreas: areas,
      gridTemplateColumns: columns && `repeat(${columns}, 1fr)`,
      gridTemplateRows: rows && `repeat(${rows}, 1fr)`,
      gridAutoColumns: auto?.[0],
      gridAutoRows: auto?.[1] ?? auto?.[0],
      gridAutoFlow: flow,
      ...style,
    },
  } as LayoutReturnOptions<O>
}

export default useLayout
