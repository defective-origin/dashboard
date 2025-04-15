import React from 'react'

// ---| core |---
import { react } from 'tools'

// ---| self |---
import './Item.module.scss'
import useItem, { ItemOptions } from './Item.hooks'

export type ItemProps<E extends React.ElementType = React.ElementType> = react.CustomTagProps<ItemOptions, E>


/**
 * Item for layout and block.
 *
 * How to use
 * @example
 * <Item />
 */
export const Item = <E extends React.ElementType = 'div',>(props: ItemProps<E>) => {
  const { as: Tag = 'div', ...itemProps } = useItem(props)
  // TODO: add opportunity to use breakpoints https://mui.com/material-ui/react-grid/#custom-breakpoints

  return <Tag {...itemProps} />
}

Item.displayName = 'Item'

export default Item
