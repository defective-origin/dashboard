import React from 'react'

// ---| core |---
import { cn, react } from 'tools'
import { Size } from 'theme'

// ---| components |---
import Text from 'components/views/Text'
import Media from 'components/views/Media'
import Block from 'components/layouts/Block'
import Dropdown from 'components/actions/Dropdown'
import { withPopup, WithPopupProps } from 'components/popups/Popup'

// ---| self |---
import css from './Avatar.module.scss'


export type AvatarSize = Size
export type AvatarProps = {
  src?: string
  alt?: string
  size?: AvatarSize
  content?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Component description.
 * @example
 * <Avatar />
 */
export const Avatar = withPopup((props: AvatarProps) => {
  const { src, size = 'xs', alt = 'user image', className, ...otherProps } = props

  return (
    <Media
      className={cn(css.Avatar, className)}
      alt={alt}
      src={src}
      width={`var(--icon-${size})`}
      height={`var(--icon-${size})`}
      {...otherProps}
    />
  )
}) as {
  (props: AvatarProps & WithPopupProps): React.JSX.Element
  displayName: string
  Group: (props: AvatarGroupProps) => React.JSX.Element
}

Avatar.displayName = 'Avatar'


export type AvatarGroupProps = {
  max?: number
  size?: AvatarSize
  className?: string
  title?: React.ReactNode
  children?: React.ReactNode
}

Avatar.Group = (props: AvatarGroupProps) => {
  const { title, max = 3, size, children, className, ...otherProps } = props
  const visibleItems = React.Children.toArray(children).slice(0, max)
  const count = React.Children.count(children)

  return (
    <Block className={cn(css.AvatarGroup, className)} v='x' width='85%' {...otherProps}>
      {react.injectProp(1, visibleItems, (node, index) => {
        if (react.isExemplar(node, [Avatar])) {
          return { size, style: { right: `${index * (65 / count)}%`, zIndex: count - index } }
        }
      })}

      {count > 1 && (
        <Dropdown className={css.more} v='wrapper' start='expand_circle_up' title={title as string} g='xs' arrow>
          {React.Children.map(children, node => {
            if (react.isExemplar(node, [Avatar])) {
              return (
                <Block v='grid' columns='auto 1fr' g='sm' aligns='center'>
                  {React.cloneElement(node, { size: 'lg', tooltip: undefined } as AvatarProps)}
                  <Text content={(node.props as any).tooltip} />
                </Block>
              )
            }

            return null
          })}
        </Dropdown>
      ) }
    </Block>
  )
}

export default Avatar
