import React, { forwardRef } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconVariant } from 'components/Icon'
import Text, { TextProps, TextVariant } from 'components/Text'
import Tooltip, { TooltipVariant } from 'components/Tooltip'
import Skeleton from 'components/Skeleton'

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
  clear?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  [key: string]: any
}

// TODO: remove forwardRef after migrating to react 19

/**
 * Component description.
 *
 * How to use
 * @example
 * <Action />
 */
export const Action = forwardRef<unknown, ActionProps>((props, ref): JSX.Element | null => {
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
      ref={ref}
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
})

Action.displayName = 'Action'

export default Action
