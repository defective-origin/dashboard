import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { withPopup } from 'components/popups/Popup'
import Text, { TextProps } from 'components/views/Text'
import Icon, { IconVariant } from 'components/views/Icon'
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './Label.module.scss'

export type LabelProps = BlockProps & {
  content?: TextProps['content']
  format?: TextProps['format']
  icon?: IconVariant
}

/**
 * Component description.
 * @example
 * <Label />
 */
export const Label = withPopup((props: LabelProps) => {
  const { content, children, format, icon, className, ...otherProps } = props

  return (
    <Block className={cn(css.Label, className)} v='x' g='xxs' aligns='center' {...otherProps}>
      <Icon v={icon} size='xs' /> {children || <Text v='body2' size='xxs' content={content} format={format} />}
    </Block>
  )
})

Label.displayName = 'Label'

export default Label
