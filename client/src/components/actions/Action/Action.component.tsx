import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconVariant } from 'components/views/Icon'
import Text, { TextProps, TextVariant } from 'components/views/Text'
import Tooltip, { TooltipVariant } from 'components/popups/Tooltip'
import Skeleton from 'components/views/Skeleton'

// ---| self |---
import './Action.module.scss'

export const initAsideContent = (content: React.ReactNode, options: ActionProps) => {
  if (!content) {
    return null
  } else if (typeof content !== 'string') {
    return content
  }

  return <Icon v={content as IconVariant} fill={options.active} color={options.color ?? 'primary'} size={options.size} loading={options.loading}/>
}

export type ActionProps = Omit<TextProps, 'v'> & {
  textV?: TextVariant
  start?: IconVariant | Exclude<React.ReactNode, string>
  end?: IconVariant | Exclude<React.ReactNode, string>
  tooltip?: React.ReactNode
  tooltipSide?: TooltipVariant
  active?: boolean
  as?: React.ElementType
  href?: string
  target?: React.HTMLAttributeAnchorTarget
  round?: boolean
  stretch?: boolean
  /** remove paddings */
  clear?: boolean
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
export const Action = (props: ActionProps) => {
  const {
    as = 'button',
    size = 'md',
    stretch,
    textV,
    align,
    ellipsis,
    start,
    end,
    round,
    color,
    loading,
    tooltip,
    active,
    clear,
    tooltipSide = 'top',
    content,
    children,
    className,
    ...otherProps
  } = props
  const _className = cn('action', size, { round, 'action--stretch': stretch, clear }, className)
  const Tag = loading ? Skeleton : as

  const item = (
    <Tag
      className={_className}
      disabled={loading}
      color={color}
      {...otherProps}
    >
      {initAsideContent(start, props)}

      {children}

      {content && (
        <Text
          className='action-content'
          v={textV}
          size={size}
          align={align}
          loading={loading}
          ellipsis={ellipsis}
          content={content}
          color={color ?? 'primary'}
          bold={active}
        />
      )}

      {initAsideContent(end, props)}
    </Tag>
  )

  if (tooltip) {
    return <Tooltip v={tooltipSide} content={tooltip}>{item}</Tooltip>
  }

  return item
}

Action.displayName = 'Action'

export default Action
