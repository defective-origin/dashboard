/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { react } from 'common/tools'

export type ComponentWithItems<OwnProps extends object, T> = OwnProps & {
  items?: T[]
}

export type RepeatVariantProps<
  RC extends Record<string, any>,
> = {
  [key in keyof RC]: { variant?: key } & React.ComponentProps<RC[key]>
}[keyof RC]

export type RepeatComponent<P extends object = any> = React.ElementType<P> | string | Record<string, React.ElementType<P> | string>

export type RepeatItem<
  RC extends RepeatComponent<any>,
> = RC extends React.ElementType<any>
  ? React.ComponentProps<RC>
  : RC extends object ? RepeatVariantProps<RC> : never

export type RepeatItemVariant<
  RC extends RepeatComponent<any>,
> = RC extends object ? RepeatVariantProps<RC>['variant'] : never

export type RepeatProps<
  RC extends RepeatComponent<any> = RepeatComponent<any>,
  RI extends RepeatItem<RC> = RepeatItem<RC>,
  V = RepeatItemVariant<RC>,
> = Partial<RI> & {
  // Component or Component map which should be used for item rendering
  cmp?: RC
  // default variant value
  variant?: V
  // array with item props
  items?: RI[]
  // select key for reconciliation [default: index]
  selectKey?: (item: RI) => React.Key
  // customize props [default: shared props + item props]
  selectProps?: (item: RI) => RI
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
  RC extends RepeatComponent<any>,
  RI extends RepeatItem<RC>,
>(props: RepeatProps<RC, RI>): JSX.Element[] | null {
  const { variant: v, cmp, items = [], selectKey, selectProps, ...sharedProps } = props

  if (!cmp || !items.length) {
    return null
  }

  const list = items.map(({ variant = v, ...otherItemProps }, idx) => {
    const Tag = react.isComponent(cmp) ? cmp : cmp[variant]
    const combinedProps = { ...sharedProps, ...otherItemProps } as React.ComponentProps<any>
    const itemProps = selectProps?.(combinedProps) ?? combinedProps
    const itemKey = selectKey?.(itemProps) ?? idx

    return <Tag key={itemKey} {...itemProps} />
  })

  return list
}

Repeat.displayName = 'Repeat'

export default Repeat
