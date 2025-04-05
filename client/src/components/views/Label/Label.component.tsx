import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Tooltip from 'components/popups/Tooltip'
import Text, { TextProps } from 'components/views/Text'
import Icon, { IconVariant } from 'components/views/Icon'
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './Label.module.scss'

export type LabelProps = BlockProps & {
  content?: TextProps['content']
  format?: TextProps['format']
  icon?: IconVariant
  tooltip?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Label />
 */
export function Label(props: LabelProps): JSX.Element {
  const { tooltip, content, format, icon, className, ...otherProps } = props
  const _className = cn(css.Label, className)
  const item = (
    <Block className={_className} v='x' g='xxs' aligns='center' {...otherProps}>
      <Icon v={icon} size='xs' /> <Text v='body2' size='xxs' content={content} format={format} />
    </Block>
  )

  if (tooltip) {
    return <Tooltip content={tooltip}>{item}</Tooltip>
  }

  return item
}

Label.displayName = 'Label'

export default Label
