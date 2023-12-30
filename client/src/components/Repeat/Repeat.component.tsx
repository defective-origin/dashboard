/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { react } from 'common/tools'


export type TypedProps<
    O extends Record<string, any>,
    TResult = {
      [key in keyof O]: { v?: key } & React.ComponentProps<O[key]>
    }[keyof O],
> = TResult

export type RepeatComponent = React.ComponentType<any> | Record<any, React.ComponentType<any>>

export type RepeatItem<
  C extends RepeatComponent,
  TResult = C extends ((args: any) => any) ? React.ComponentProps<C> : TypedProps<C>
> = TResult

export type RepeatProps<
  C extends RepeatComponent,
  P = RepeatItem<C>,
> = Partial<P> & {
  // Component or Component map which should be used for item rendering
  cmp?: C
  // array with item props
  items?: P[]
  // select key for reconciliation [default: index]
  selectKey?: (item: P) => React.Key
  // customize props [default: shared props + item props]
  selectProps?: (item: P) => P
}

/**
 * Build array with rendered components in it.
 * @example
 * // Render items with one component type
 * function Item({ content }): JSX.Element {
 *   return <p className='item'>{content}</p>
 * }
 *
 * const items: RepeatItem<ItemProps>[] = [
 *   { content: '1' },
 *   { content: '2' },
 *   { content: '3' },
 * ]
 *
 * <Repeat cmp={Item} items={items} shared_propA shared_propB />
 * // <React.Fragment>
 * //   <Item content='1' />
 * //   <Item content='2' />
 * //   <Item content='3' />
 * // </React.Fragment>
 *
 *
 * // Render items with several component types
 * const ItemA = ({ content }) => <p className='itemA'>{content}</p>
 * const ItemB = ({ content }) => <p className='itemB'>{content}</p>
 * const ItemC = ({ content }) => <p className='itemC'>{content}</p>
 *
 * const itemMap = {
 *    a: ItemA,
 *    b: ItemB,
 *    c: ItemC,
 * }
 *
 * const items: RepeatItem<ItemProps>[] = [
 *   { v: 'a', content: '1' },
 *   { v: 'b', content: '2' },
 *   { v: 'c', content: '3' },
 * ]
 *
 * <Repeat cmp={itemMap} items={items} shared_propA shared_propB />
 * // <React.Fragment>
 * //   <ItemA content='1' />
 * //   <ItemB content='2' />
 * //   <ItemC content='3' />
 * // </React.Fragment>
 *
 *
 * // Setup default component type for items
 * <Repeat cmp={itemMap} items={items} v='DEFAULT TYPE' />
 *
 * // Note: You need to cast your items to RepeatItem otherwise typescript can create not appropriate type
 * // if you need to repeat component
 * const items: RepeatItem<typeof Item>[] = []
 *
 * // if you need to repeat components from Map
 * const items: RepeatItem<typeof ITEM_MAP>[] = []
 */
export function Repeat<
  Item extends RepeatComponent,
>(props: RepeatProps<Item>): JSX.Element[] | null {
  const { v: defaultItemType, cmp, items = [], selectKey, selectProps, ...sharedProps } = props

  if (!cmp || !items.length) {
    return null
  }

  const list = items.map(({ v = defaultItemType, ...otherItemProps }, idx) => {
    const Tag = react.isComponent(cmp) ? cmp : cmp[v]
    const combinedProps = { ...sharedProps, ...otherItemProps } as React.ComponentProps<any>
    const itemProps = selectProps?.(combinedProps) ?? combinedProps
    const itemKey = selectKey?.(itemProps) ?? idx

    return <Tag key={itemKey} {...itemProps} />
  })

  return list
}

Repeat.displayName = 'Repeat'

export default Repeat
