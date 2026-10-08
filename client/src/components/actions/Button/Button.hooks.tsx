import React from 'react'

// ---| core |---
import { cn, jss } from 'tools'
import { Color, Size, toColor, toSize, toSpace } from 'theme'

// ---| components |---
import Icon, { IconVariant } from 'components/views/Icon'

// ---| self |---
import css from './Button.module.scss'


export const initAsideContent = (content: React.ReactNode, options: ButtonStyleOptions, end?: boolean) => {
  if (!content || typeof content !== 'string') {
    return content
  }

  return <Icon className={cn(end && css.end)} v={content as IconVariant} fill={options.active} />
}


export type ButtonVariant = 'text' | 'outlined' | 'filled' | 'wrapper'

export type ButtonStyleOptions = {
  /**
   * `text` for links  
   * `outlined` for secondary actions  
   * `filled` for primary actions  
   * `wrapper` for wrapping cards, logo and so on  
   */
  v?: ButtonVariant
  start?: IconVariant | Exclude<React.ReactNode, string>
  end?: IconVariant | Exclude<React.ReactNode, string>
  active?: boolean
  disabled?: boolean
  color?: Color
  size?: Size
  weight?: React.CSSProperties['fontWeight']
  format?: React.CSSProperties['textTransform']
  className?: string
  content?: React.ReactNode
  children?: React.ReactNode
  style?: React.CSSProperties
}

/**
 * Set inner content and styles for action
 * @example
 * const updatedProps = useActionStyle(props)
 */
export function useButtonStyle<P extends ButtonStyleOptions>(options: P) {
  const { size, color, v, start, end, active, weight, format, className, children, content, style, ...other } = options
  const isIcon = !content && !children && [start, end].filter(Boolean).length === 1

  // TODO: do processing prop. spinner should rotating on start or end icon. should take Promise on click
  return {
    ...other,
    className: cn(css.Button, v && css[v], jss({
      ...style,
      padding: isIcon ? toSpace('xxs') : undefined,
      fontSize: toSize('text', size),
      textTransform: format,
      fontWeight: weight,
      ...v === 'filled' ? {
        background: toColor(color),
        '&:hover': { background: `color-mix(in srgb, ${toColor(color)} 80%, black)` },
        '&:active': { background: `color-mix(in srgb, ${toColor(color)} 90%, black)` },
      } : v !== 'wrapper' && {
        color: toColor(color),
        '&:hover': { background: toColor(color && `${color}-6`) },
        '&:active': { background: toColor(color && `${color}-5`) },
      },
    }), active, className),
    children: (
      <>
        {initAsideContent(start, options)}

        {content ?? children}

        {initAsideContent(end, options, true)}
      </>
    ),
  }
}
