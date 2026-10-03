import React from 'react'

// ---| core |---
import { cn, str, jss } from 'tools'
import { Color, Palette, Size, Space, toSpace, toVar } from 'theme'

// ---| self |---
import './Item.module.scss'


export type ItemColor = Color | 'none'
export type ItemArea = 'left' | 'right' | 'top' | 'bottom' | 'center'

export type ItemOptions = {
  // block model
  g?: str.RepeatWithSep<Space, ' ', 1>
  p?: str.RepeatWithSep<Space, ' ', 3>
  m?: str.RepeatWithSep<Space, ' ', 3>
  width?: React.CSSProperties['width']
  minWidth?: React.CSSProperties['minWidth']
  maxWidth?: React.CSSProperties['maxWidth']
  height?: React.CSSProperties['height']
  minHeight?: React.CSSProperties['minHeight']
  maxHeight?: React.CSSProperties['maxHeight']
  border?: React.CSSProperties['border'] | boolean
  radius?: Size
  display?: React.CSSProperties['display']
  bg?: Palette
  sh?: Size

  // position
  pos?: React.CSSProperties['position']
  top?: React.CSSProperties['top']
  bottom?: React.CSSProperties['bottom']
  left?: React.CSSProperties['left']
  right?: React.CSSProperties['right']

  // layout
  order?: React.CSSProperties['order']
  align?: React.CSSProperties['alignSelf']
  justify?: React.CSSProperties['justifySelf']
  place?: React.CSSProperties['placeSelf']

  // grid
  row?: React.CSSProperties['gridRow']
  column?: React.CSSProperties['gridColumn']
  area?: React.CSSProperties['gridArea'] | ItemArea

  // flex
  flex?: React.CSSProperties['flex']
  grow?: React.CSSProperties['flexGrow']
  shrink?: React.CSSProperties['flexShrink']
  basis?: React.CSSProperties['flexBasis']

  // custom
  fit?: boolean
  visible?: boolean
  stretch?: boolean
  style?: React.CSSProperties
  className?: string
}

export type ItemReturnOptions<O extends object> = O & {
  className: string
}

/**
 * Allows set base block styles
 * @example
 * const modifiedProps = useItem(props)
 */
export const useItem = <O extends object>(options: O & ItemOptions): ItemReturnOptions<O> => {
  const {
    // block model
    m, p, g,
    width, minWidth, maxWidth,
    height, minHeight, maxHeight,
    border, radius, display, bg, sh,
    // position
    pos, top, bottom, left, right,
    // layout
    order, align, justify, place,
    // grid
    area, row, column,
    // flex props
    flex, grow, shrink, basis,
    // custom
    fit,
    visible = true,
    stretch,
    style,
    className,
    ...otherOptions
  } = options

  return {
    ...otherOptions,
    className: cn('item', {
      stretch,
      fit,
    }, jss({
      // block model
      margin: toSpace(m), padding: toSpace(p), gap: toSpace(g),
      width, minWidth, maxWidth,
      height, minHeight, maxHeight,
      border: typeof border === 'boolean' ? toVar('border') : border,
      borderRadius: radius && toVar(`radius-${radius}`),
      boxShadow: sh && toVar(`box-shadow-${sh}`),
      display: visible? display : 'none', // TODO: if invisible then return null
      background: bg && toVar('color', bg),
      // position
      position: pos, top, bottom, left, right,
      // layout
      order, alignSelf: align, justifySelf: justify, placeSelf: place,
      // grid
      gridArea: area, gridRow: row, gridColumn: column,
      // flex props
      flex, flexGrow: grow, flexShrink: shrink, flexBasis: basis,
      ...style,
    }), className),
  } as ItemReturnOptions<O>
}

export default useItem
