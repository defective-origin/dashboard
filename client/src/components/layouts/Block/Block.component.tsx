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
 * <Block g='md' p='md' v="xy" />
 */
export function Block<E extends React.ElementType = 'div'>(props: BlockProps<E>): JSX.Element | null {
  const { as: Tag = 'div', ...blockProps } = useBlock(props)

  return <Tag {...blockProps} />
}

Block.displayName = 'Block'

export default Block
