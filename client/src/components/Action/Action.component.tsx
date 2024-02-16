import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconSize, IconVariant } from 'components/Icon'
import Text, { TextProps, TextVariant } from 'components/Text'
import Tooltip, { TooltipProps } from 'components/Tooltip'

// ---| self |---
import './Action.module.scss'
import Skeleton from 'components/Skeleton'

export const initAsideContent = (content: React.ReactNode, size?: IconSize, fill?: boolean, loading?: boolean) => {
  if (typeof content !== 'string') {
    return content
  }

  return <Icon v={content as IconVariant} fill={fill} size={size} loading={loading}/>
}

export type ActionProps = Omit<TextProps, 'v'> & {
  textV?: TextVariant
  iconSize?: IconSize
  start?: IconVariant | Exclude<React.ReactNode, string>
  end?: IconVariant | Exclude<React.ReactNode, string>
  tooltip?: TooltipProps | TooltipProps['content']
  fillIcon?: boolean
  as?: React.ElementType
  href?: string
  target?: React.HTMLAttributeAnchorTarget
  round?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  [key: string]: any
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Action />
 */
export function Action(props: ActionProps): JSX.Element {
  const {
    as = 'button',
    size = 'md',
    iconSize = size,
    textV,
    align,
    multiline,
    ellipsis,
    start,
    end,
    round,
    fillIcon,
    loading,
    tooltip,
    content,
    children = content,
    className,
    ...otherProps
  } = props
  const _className = cn('action', size, { round }, className)
  const Tag = loading ? Skeleton : as

  const item = (
    <Tag className={_className} disabled={loading} {...otherProps}>
      {start && initAsideContent(start, iconSize, fillIcon, loading)}

      {children && (
        <Text
          v={textV}
          size={size}
          align={align}
          loading={loading}
          ellipsis={ellipsis}
          multiline={multiline}
          content={content}
          children={children}
        />
      )}

      {end && initAsideContent(end, iconSize, fillIcon, loading)}
    </Tag>
  )

  if (tooltip) {
    const tooltipProps = typeof tooltip === 'object' ? tooltip : { content: tooltip }

    return <Tooltip {...tooltipProps}>{item}</Tooltip>
  }

  return item
}

Action.displayName = 'Action'

export default Action
