import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Color, Size } from 'theme'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Icon, { IconVariant } from 'components/views/Icon'

// ---| self |---
import './Button.module.scss'

export const OVERFLOW_ATTR = 'data-collect' // TODO: move inside hook useOverflow which will collect items when space is not enough

export const initAsideContent = (content: React.ReactNode, options: ButtonStyleOptions) => {
  if (!content || typeof content !== 'string') {
    return content
  }

  return <Icon v={content as IconVariant} fill={options.active} size={options.size} />
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
}

/**
 * Set inner content and styles for action
 * @example
 * const updatedProps = useActionStyle(props)
 */
export function useButtonStyle<P extends ButtonStyleOptions>(options: P) {
  const { size, color, v, start, end, active, className, children, content, ...other } = options
  const colorClassName = v === 'filled' ? `b-${color}` : `c-${color}`

  // TODO: do size as in mui and icon variant
  return {
    ...other,
    className: cn('button', v, colorClassName, active, className),
    [OVERFLOW_ATTR]: true,
    children: v === 'wrapper'
      ? children
      : (
        <>
          {initAsideContent(start, options)}

          {children}

          {content && (
            <Text
              className='button-content'
              v='button'
              format='uppercase'
              size={size}
              content={content}
            />
          )}

          {initAsideContent(end, options)}
        </>
      ),
  }
}
