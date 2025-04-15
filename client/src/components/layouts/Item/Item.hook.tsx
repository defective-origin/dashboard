import React from 'react'

// ---| core |---
import { cn, obj } from 'tools'
import { Color, Size } from 'theme'

// ---| self |---
import './Item.module.scss'

export type ItemSpace = Size | 'none'
export type ItemColor = Color | 'none'
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
  position?: React.CSSProperties['position']
  color?: React.CSSProperties['color']

  top?: React.CSSProperties['top']
  bottom?: React.CSSProperties['bottom']
  left?: React.CSSProperties['left']
  right?: React.CSSProperties['right']

  visible?: boolean

  column?: string
  row?: string
  span?: string


  fit?: boolean
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
    fit,
    column,
    row,
    span,
    visible = true,
    color,
    position,
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
    top, bottom, left, right,
    children,
    className,
    style,
    ...otherOptions
  } = options
  // TODO: add variants to p, m, g sizes: 'xl', 'xl xl', toSize('xl xl 0 xl', sep=' ')
  // TODO: background, border, box shadow

  return {
    ...otherOptions,
    children,
    className: cn('item', {
      [`p--${p}`]: p,
      [`m--${m}`]: m,
      [`g--${g}`]: g,
      invisible: !visible,
      stretch,
      fit,
    }, className),
    style: obj.clear({
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
      top, bottom, left, right,
      background,
      border,
      display,
      position,
      color,

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
    }),
  } as ItemReturnOptions<O>
}

export default useItem
