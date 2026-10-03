import React from 'react'
import Media from 'components/views/Media'
import Block from 'components/layouts/Block'

// ---| core |---
import { cn, react } from 'tools'
import { Size } from 'theme'

// ---| components |---

// ---| self |---
import css from './Avatar.module.scss'

export type AvatarSize = Size

export type AvatarProps = {
  src?: string
  alt?: string
  size?: AvatarSize
  content?: string
  className?: string
}

/**
 * Component description.
 * @example
 * <Avatar />
 */
export function Avatar(props: AvatarProps) {
  const { src, size, alt = 'user image', className, ...otherProps } = props

  return (
    <Media
      className={cn(css.Avatar, size && `t--${size}`, className)}
      alt={alt}
      src={src}
      width={`var(--icon-${size})`}
      height={`var(--icon-${size})`}
      {...otherProps}
    />
  )
}

Avatar.displayName = 'Avatar'


export type AvatarGroupProps = {
  total?: number
  max?: number
  size?: AvatarSize
  className?: string
  children?: React.ReactNode
}

Avatar.Group = (props: AvatarGroupProps) => {
  const { max, total = 3, size, children, className, ...otherProps } = props
  const visibleItems = React.Children.toArray(children).slice(0, max)
  const updated = react.injectProp(visibleItems, 1, { size }, node => react.isExemplar(node, [Avatar]))

  return (
    <Block className={cn(css.AvatarGroup, className)} v='x' {...otherProps}>
      {updated}
      {total}
    </Block>
  )
}

export default Avatar
