import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'
import Text, { TextColor, TextFormat, TextProps, TextSize } from 'components/views/Text'

// ---| self |---
import css from './Spec.module.scss'

export type SpecProps = BlockProps & {
  vertical?: boolean
  name: React.ReactNode
  content?: React.ReactNode
  format?: TextFormat
  color?: TextColor
  size?: TextSize
  sep?: React.ReactNode
  placeholder?: TextProps['placeholder']
}

/**
 * Show 'name: value' information.
 *
 * How to use
 * @example
 * <Spec name='Name' content='bOotS' format='uppercase' size='xxs' />
 * <Spec name='Size' content={123456} format='weight' vertical />
 */
export function Spec(props: SpecProps): JSX.Element {
  const { vertical, sep = ':', name, color, placeholder, justifies, format, size = 'xs', content, children, className, ...otherProps } = props
  const _className = cn(css.Spec, className)

  return (
    <Block className={_className} v={vertical ? 'y' : 'x'} g={vertical ? undefined : size} {...otherProps}>
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
