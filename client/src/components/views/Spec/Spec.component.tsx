import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'
import Text, { TextProps } from 'components/views/Text'

// ---| self |---
import css from './Spec.module.scss'

export type SpecProps
  = BlockProps
  & Pick<TextProps, 'color' | 'size' | 'format' | 'placeholder' | 'content'>
  & {
    vertical?: boolean
    name: React.ReactNode
    sep?: React.ReactNode
  }

/**
 * Show 'name: value' information.
 * @example
 * <Spec name='Name' content='bOotS' format='uppercase' size='xxs' />
 * <Spec name='Size' content={123456} format='weight' vertical />
 */
export function Spec(props: SpecProps) {
  const { vertical, sep = ':', name, color, placeholder, justifies, format, size = 'xs', content, children, className, ...otherProps } = props

  return (
    <Block className={cn(css.Spec, className)} v={vertical ? 'y' : 'x'} g={vertical ? undefined : size} {...otherProps}>
      <Text className={css.Name} format='title' size={size} color={color} bold content={`${name}${sep}`} />

      <Block className={css.Content} justifies={justifies} grow={1} v='xy'>
        <Text
          content={content}
          format={format}
          size={size}
          color={color}
          placeholder={placeholder}
        />

        {children}
      </Block>
    </Block>
  )
}

Spec.displayName = 'Spec'

export default Spec
