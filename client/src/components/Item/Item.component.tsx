import React, { LegacyRef, forwardRef } from 'react'

// ---| core |---
import { react } from 'tools'

// ---| self |---
import './Item.module.scss'
import useItem, { ItemOptions } from './Item.hook'

export type ItemProps<E extends React.ElementType = React.ElementType> = react.CustomTagProps<ItemOptions, E>

// TODO: remove forwardRef after migrating to react 19

/**
 * Item for layout and block.
 *
 * How to use
 * @example
 * <Item />
 */
export const Item = forwardRef(<E extends React.ElementType = 'div',>(props: ItemProps<E>, ref: LegacyRef<unknown>): JSX.Element | null => {
  const { as: Tag = 'div', ...itemProps } = useItem(props)

  return <Tag ref={ref as LegacyRef<HTMLDivElement>} {...itemProps} />
})

Item.displayName = 'Item'

export default Item
