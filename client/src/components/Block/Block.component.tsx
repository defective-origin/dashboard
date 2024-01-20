import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Divider from 'components/Divider'
import Spacer from 'components/Spacer'

// ---| common |---
import { react } from 'common/tools'

// ---| self |---
import useBlock, { UseBlockOptions } from './Block.hook'

// TODO: extend all type which use Block props by <E extends React.ElementType>
export type BlockProps<E extends React.ElementType = React.ElementType> = react.CustomTagProps<UseBlockOptions, E>

/**
 * Component description.
 *
 * https://mui.com/material-ui/react-stack/
 *
 * How to use
 * @example
 * <Block />
 */
export function Block<E extends React.ElementType>(props: BlockProps<E>): JSX.Element | null {
  const {
    options,
    as = 'div',
    children,
    className,
    style,
    ...otherProps
  } = useBlock(props)
  const Tag = as as Exclude<React.ElementType, undefined>

  if (!react.isComponent(Tag)) {
    return null
  }

  return (
    <Tag className={className} style={style} {...otherProps}>
      {children}
    </Tag>
  )
}

Block.displayName = 'Block'

Block.Divider = Divider
Block.Spacer = Spacer

export default Block
