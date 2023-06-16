/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentProps } from 'react'

// ---| common |---
import { wk } from 'common/tools'

const first = <T extends unknown>(x: T) => x

export type ExtensionItem<ItemProps extends Record<string, any>> = Partial<ItemProps> & {
  [key: string]: any
}

export type RepeatItem<ItemProps extends Record<string, any>> = ExtensionItem<ItemProps> & {
  items?: RepeatItem<ItemProps>[]
}

export type RepeatProps<
  Item extends React.ComponentType<any>,
  BlockItem extends React.ComponentType<any> = Item,
  ItemProps extends Record<string, unknown> = ComponentProps<Item> | ComponentProps<BlockItem>,
  OptionalItemProps = ExtensionItem<ItemProps>,
> = OptionalItemProps & {
  // Component which will be used for each array item which has no sub items
  item?: Item
  // Component which will be used for each array item which has sub items or Item if block is not set
  block?: BlockItem
  // array which should be iterated
  for?: RepeatItem<ItemProps>[]
  // should nested arrays be iterated
  nested?: boolean
  // should nested arrays be unwrapped into first array
  flatten?: boolean
  // select key for reconciliation (default = weak-key)
  selectKey?: (item: OptionalItemProps, isBlock: boolean) => React.Key
  // customize props (default = shared props + item props)
  selectProps?: (item: OptionalItemProps, isBlock: boolean) => ItemProps
}

/**
 * Build array with rendered components in it.
 * @example
 * type ProxyItemProps = {
 *   text: string
 *   title: string
 *   children?: React.ReactNode
 * }
 *
 * // To do proxy component if we need use two component types (treeNode, leafNode)
 * function ProxyItem(props: ProxyItemProps): JSX.Element {
 *   // if item is tree node and has nested items
 *   if (props.children) {
 *     return <div className='block'>{props.children}</div>
 *   }
 *
 *   // if item is leaf node
 *   return <p className='item'>{props.text}</p>
 * }
 *
 * const items: RepeatItem<ProxyItemProps>[] = [
 *   { title: 'title', text: 'text' },
 *   { text: 'text' },
 *   {
 *     title: 'title',
 *     for: [
 *       { text: 'text' },
 *       { text: 'text' },
 *     ],
 *   },
 * ]
 *
 * const renderWithNestedItems = <Repeat block={block} item={item} for={items} additional_prop />
 * const renderWithNestedItems = <Repeat item={ProxyItem} for={items} additional_prop />
 * // // render only first level of array
 * // <React.Fragment>
 * //   <ProxyItem title='title' text='text' />
 * //   <ProxyItem text='text' />
 * //   <ProxyItem title='title' />
 * // </React.Fragment>
 *
 * const renderWithNestedItems = <Repeat block={block} item={item} for={items} nested additional_prop />
 * const renderWithNestedItems = <Repeat item={ProxyItem} for={items} nested additional_prop />
 * // // render all nested arrays
 * // <React.Fragment>
 * //   <ProxyItem title='title' text='text' />
 * //   <ProxyItem text='text' />
 * //   <ProxyItem title='title'>
 * //      <React.Fragment>
 * //        <ProxyItem text='text' />
 * //        <ProxyItem text='text' />
 * //      </React.Fragment>
 * //   </ProxyItem>
 * // </React.Fragment>
 *
 * const renderWithNestedItems = <Repeat block={block} item={item} for={items} flatten additional_prop />
 * const renderWithNestedItems = <Repeat item={ProxyItem} for={items} flatten additional_prop />
 * // // render all nested arrays into first level array (like array.flat(Infinity))
 * // <React.Fragment>
 * //   <ProxyItem title='title' text='text' />
 * //   <ProxyItem text='text' />
 * //   <React.Fragment>
 * //     <ProxyItem title='title' />
 * //     <React.Fragment>
 * //       <ProxyItem text='text' />
 * //       <ProxyItem text='text' />
 * //     </React.Fragment>
 * //   </React.Fragment>
 * // </React.Fragment>
 */
// FIXME: remove root fragment wrapper return array
export default function Repeat<
  Item extends React.ComponentType<any>,
  BlockItem extends React.ComponentType<any> = Item,
>(props: RepeatProps<Item, BlockItem>): JSX.Element | null {
  const {
    item,
    block = item,
    for: forItems = [],
    nested,
    flatten,
    selectKey = wk,
    selectProps = first,
    ...sharedProps
  } = props

  if (!item || !forItems.length) {
    return null
  }

  const list = forItems.map(({ items, ...otherItemProps }) => {
    const Component = (items?.length ? block : item) as React.ComponentType<RepeatItem<Record<string, unknown>>>
    const combinedProps = { ...sharedProps, ...otherItemProps } as ComponentProps<Item>
    const itemChildren = (nested || flatten) && items?.length && <Repeat {...props} for={items} />
    const itemProps = selectProps(combinedProps, !!items?.length)
    const itemKey = selectKey(itemProps, !!items?.length)

    if (flatten) {
      return (
        <React.Fragment key={itemKey}>
          <Component {...itemProps} />
          {itemChildren}
        </React.Fragment>
      )
    }

    return <Component key={itemKey} children={itemChildren || undefined } {...itemProps} />
  })

  return <React.Fragment>{list}</React.Fragment>
}
