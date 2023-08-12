/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentProps } from 'react'

export type TypedProps<
    O extends object,
    TResult = {
        [key in keyof O]: { v?: key } & React.ComponentProps<O[key]>
    }[keyof O],
> = TResult

export type RepeatComponent = React.ComponentType<any> | Record<any, React.ComponentType<any>>

export type RepeatItem<
  C extends RepeatComponent,
  TResult = C extends ((args: any) => any) ? ComponentProps<C> : TypedProps<C>
> = TResult

export type RepeatPropKeys = 'cmp' | 'items' | 'selectKey' | 'selectProps' | 'v'
export type OnlyRepeatProps<C extends RepeatComponent> = Pick<RepeatProps<C>, RepeatPropKeys>

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
 */
export function Repeat<
  Item extends RepeatComponent,
>(props: RepeatProps<Item>): JSX.Element | null {
  const { v: defaultItemType, cmp, items = [], selectKey, selectProps, ...sharedProps } = props

  if (!cmp || !items.length) {
    return null
  }

  const list = items.map(({ v = defaultItemType, ...otherItemProps }, idx) => {
    const Tag = typeof cmp === 'function' ? cmp as React.ComponentType : cmp[v]
    const combinedProps = { ...sharedProps, ...otherItemProps } as ComponentProps<any>
    const itemProps = selectProps?.(combinedProps) ?? combinedProps
    const itemKey = selectKey?.(itemProps) ?? idx

    return <Tag key={itemKey} {...itemProps} />
  })

  return <React.Fragment>{list}</React.Fragment>
}

Repeat.displayName = 'Repeat'

export default Repeat
