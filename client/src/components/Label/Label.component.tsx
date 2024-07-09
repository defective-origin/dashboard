import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/Block'
import Text, { TextProps } from 'components/Text'
import Icon, { IconVariant } from 'components/Icon'

// ---| self |---
import css from './Label.module.scss'

export type LabelProps = BlockProps & {
  content?: TextProps['content']
  format?: TextProps['format']
  icon: IconVariant
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Label />
 */
export function Label(props: LabelProps): JSX.Element {
  const { content, format, icon, className, ...otherProps } = props
  const _className = cn(css.Label, className)

  return (
    <Block className={_className} v='x' g='xxs' aligns='center' {...otherProps}>
      <Icon v={icon} size='xs' /> <Text v='body2' size='xxs' content={content} format={format} />
    </Block>
  )
}

Label.displayName = 'Label'

export default Label
