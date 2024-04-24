import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Size } from 'theme'

// ---| self |---
import './Item.module.scss'

export type ItemSpace = Size
export type ItemArea = 'left' | 'right' | 'top' | 'bottom' | 'center'

export type ItemOptions = {
  g?: ItemSpace
  gap?: React.CSSProperties['gap']
  p?: ItemSpace
  padding?: React.CSSProperties['padding']
  m?: ItemSpace
  margin?: React.CSSProperties['margin']
  display?: React.CSSProperties['display']
  flex?: React.CSSProperties['flex']
  order?: React.CSSProperties['order']
  area?: ItemArea | React.CSSProperties['gridArea']
  minWidth?: React.CSSProperties['minWidth']
  minHeight?: React.CSSProperties['minHeight']
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
  maxWidth?: React.CSSProperties['maxWidth']
  maxHeight?: React.CSSProperties['maxHeight']
  grow?: React.CSSProperties['flexGrow']
  shrink?: React.CSSProperties['flexShrink']
  basis?: React.CSSProperties['flexBasis']
  align?: React.CSSProperties['alignSelf']
  justify?: React.CSSProperties['justifySelf']
  place?: React.CSSProperties['placeSelf']
  background?: React.CSSProperties['background']
  border?: React.CSSProperties['border']


  column?: string
  row?: string
  span?: string


  stretch?: boolean
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

export type ItemReturnOptions<O extends object> = O & {
  className: string
  children: React.ReactNode
  style: React.CSSProperties
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useItem(conf)
 */
export const useItem = <O extends object>(options: O & ItemOptions): ItemReturnOptions<O> => {
  const {
    column,
    row,
    span,
    display,
    area,
    align,
    order,
    justify,
    place,
    stretch,
    background,
    border,
    flex,
    m, p, g,
    margin, padding, gap,
    grow, shrink, basis,
    minWidth, width, maxWidth,
    minHeight, height, maxHeight,
    children,
    className,
    style,
    ...otherOptions
  } = options

  return {
    ...otherOptions,
    children,
    className: cn('item', {
      [`p--${p}`]: p,
      [`m--${m}`]: m,
      [`g--${g}`]: g,
      stretch: stretch,
    }, className),
    style: {
      order,
      gridArea: area,
      alignSelf: align,
      justifySelf: justify,
      placeSelf: place,
      flex,
      flexGrow: grow, flexShrink: shrink, flexBasis: basis,
      margin, padding, gap,
      minWidth, width, maxWidth,
      minHeight, height, maxHeight,
      background,
      border,
      display,

      // grid-column-start
      // grid-column-end
      // grid-row-start
      // grid-row-end
      // grid-column
      // grid-row


      // gap,
      // row-gap,
      // column-gap


      ...style,
    },
  } as ItemReturnOptions<O>
}

export default useItem
