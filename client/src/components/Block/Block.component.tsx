import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat, { RepeatComponent, RepeatItem, RepeatProps } from 'components/Repeat'
import Divider from 'components/Divider'
import Spacer from 'components/Spacer'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import useBlock, { UseBlockOptions } from './Block.hook'

export type BlockItem<C extends RepeatComponent = RepeatComponent> = RepeatItem<C>

export type BlockProps<O extends RepeatComponent = RepeatComponent> = RepeatProps<O> & UseBlockOptions & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  as?: React.ElementType
}

/**
 * Component description.
 *
 * https://mui.com/material-ui/react-stack/
 *
 * How to use
 * @example
 * <Block />
 */
export function Block<C extends RepeatComponent>(props: BlockProps<C>): JSX.Element | null {
  const block = useBlock(props)
  const {
    as = 'div',
    cmp,
    content,
    children = content,
    className = 'block',
    ...otherProps
  } = block.otherOptions
  // const scroll = useScroll()
  const Tag = as as Exclude<React.ElementType, undefined>

  if (!children && !content && !react.isComponent(Tag)) {
    return null
  }

  return (
    <Tag className={cn(block.className, className)} style={block.style}>
      <Repeat cmp={cmp} {...otherProps} />

      {children}
    </Tag>
  )
}

Block.displayName = 'Block'

Block.Divider = Divider
Block.Spacer = Spacer

export default Block
