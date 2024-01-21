import React from 'react'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Text, { TextProps } from 'components/Text'
import Icon from '../Icon'

// ---| self |---
import css from './Link.module.scss'
import { isNewTabLink } from './Link.tool'

export type LinkProps = Omit<MuiLinkProps, 'content' | 'size'>
                      & Pick<TextProps, 'start' | 'content' | 'end' | 'size' | 'iconSize' | 'align' | 'fillIcon' | 'color'>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Link />
 */
export function Link(props: LinkProps): JSX.Element {
  const { align, href, target, start, end, size, iconSize, fillIcon, color, content, children, className, ...otherProps } = props
  const _className = cn(css.Link, className)
  const isOpenInNewTab = isNewTabLink(href, target)
  const linkTarget = isOpenInNewTab ? '_blank' : target

  return (
    <MuiLink
      className={_className}
      target={linkTarget}
      rel={isOpenInNewTab ? 'noreferrer' : undefined}
      underline='hover'
      href={href}
      {...otherProps}
    >
      {children ?? (
        <Text
          start={start}
          content={content}
          end={end ?? (isOpenInNewTab && <Icon size='xs' v='open_in_new' />)}
          size={size}
          iconSize={iconSize}
          align={align}
          fillIcon={fillIcon}
          color={color}
        />
      )}
    </MuiLink>
  )
}

Link.displayName = 'Link'

export default Link
