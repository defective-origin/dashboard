import React from 'react'

// ---| core |---
import { react } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| self |---
import useBlock, { BlockOptions } from './Block.hook'

// TODO: extend all type which use Block props by <E extends React.ElementType>
// TODO: add width, height
export type BlockProps<E extends React.ElementType = React.ElementType> = react.CustomTagProps<BlockOptions, E>

/**
 * Flex orientation component.
 * Allows to work with flex items.
 *
 * How to use
 * @example
 * <Block gap='md' padding='md' direction="xy" />
 */
export function Block<E extends React.ElementType>(props: BlockProps<E>): JSX.Element | null {
  const { as = 'div', children, className, style, ...otherProps } = useBlock(props)
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

export default Block
