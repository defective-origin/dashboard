import React from 'react'
import MuiDivider, { DividerProps as MuiDividerProps } from '@mui/material/Divider'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Text, { TextIcon } from 'components/lib/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Divider.module.scss'

export type DividerProps = Omit<MuiDividerProps, 'content'> & {
  content?: React.ReactNode
  icon?: TextIcon
  prefix?: TextIcon
  postfix?: TextIcon
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Divider />
 */
export function Divider(props: DividerProps): JSX.Element {
  const { icon, prefix = icon, postfix, content, children, className, ...otherProps } = props
  const _className = cn(css.Divider, className)
  const hasContent = icon || prefix || content || postfix || children
  const _content = children ?? <Text prefix={icon ?? prefix} content={content ?? children} postfix={postfix} />

  return <MuiDivider className={_className} {...otherProps} children={hasContent && _content} />
}

Divider.displayName = 'Divider'

export default Divider
