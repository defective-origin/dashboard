import React from 'react'
import MuiAvatar from '@mui/material/Avatar'
import MuiAvatarGroup from '@mui/material/AvatarGroup'

// ---| core |---
import { cn } from 'tools'
import { Size } from 'theme'

// ---| pages |---
// ---| screens |---
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
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Avatar />
 */
export function Avatar(props: AvatarProps) {
  const { src, size, alt = 'user image', content, children = content, className, ...otherProps } = props
  const _className = cn(css.Avatar, {
    [`icon--${size}`]: size,
  }, className)

  return <MuiAvatar className={_className} alt={alt} src={src} children={children} {...otherProps} />
}

Avatar.displayName = 'Avatar'


export type AvatarGroupProps = {
  items?: AvatarProps[]
  total?: number
  max?: number
  size?: AvatarSize
  className?: string
  children?: React.ReactNode
}

Avatar.Group = (props: AvatarGroupProps) => {
  const { items = [], max, total = 3, size, children, ...otherProps } = props

  // TODO: Fix text avatar where one or two letters
  // TODO: Fix total avatar with count. +5k
  return (
    <MuiAvatarGroup
      total={total}
      {...otherProps}
    >
      {items.slice(0, max).map((item, idx) => <Avatar key={idx} size={size} {...item} />)}

      {children}
    </MuiAvatarGroup>
  )
}

export default Avatar
