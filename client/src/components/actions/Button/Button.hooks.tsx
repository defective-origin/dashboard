import React from 'react'

// ---| core |---
import { cn, jss } from 'tools'
import { Color, Size, toColor, toSize } from 'theme'

// ---| components |---
import Icon, { IconVariant } from 'components/views/Icon'

// ---| self |---
import './Button.module.scss'


export const initAsideContent = (content: React.ReactNode, options: ButtonStyleOptions) => {
  if (!content || typeof content !== 'string') {
    return content
  }

  return <Icon v={content as IconVariant} fill={options.active} />
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
  const { size, color, v, start, end, active, className, children, content, style, ...other } = options

  // TODO: do processing prop. spinner should rotating on start or end icon. should take Promise on click
  return {
    ...other,
    className: cn('button', v, jss({
      ...style,
      fontSize: size && toSize('text', size),
      ...v === 'filled' ? {
        background: color && toColor(color),
        '&:hover': { background: `color-mix(in srgb, ${toColor(color)} 80%, black)` },
        '&:active': { background: `color-mix(in srgb, ${toColor(color)} 90%, black)` },
      } : {
        color: color && toColor(color),
        '&:hover': { background: color && toColor(`${color}-6`) },
        '&:active': { background: color && toColor(`${color}-5`) },
      },
    }), active, className),
    children: v === 'wrapper'
      ? children
      : (
        <>
          {initAsideContent(start, options)}

          {content ?? children}

          {initAsideContent(end, options)}
        </>
      ),
  }
}
