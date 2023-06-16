import React from 'react'

// ---| components |---
import Component, { ComponentProps } from 'components/Component'

// ---| self |---
import Repeat, { RepeatItem, RepeatProps } from './Repeat.component'

export type RepeatMapItem<ItemProps extends Record<string, any>> = RepeatItem<ItemProps & ComponentProps>

export type RepeatMapProps<
  ItemMap extends Record<string, any>,
> = RepeatProps<ItemMap[keyof ItemMap] & typeof Component> & {
  // Map of Component which will be used for each array item
  map?: ItemMap
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
 * // To do map of components to render by type
 * const componentMap = {
 *  header: () => <div className="header">header</div>
 *  footer: () => <div className="footer">footer</div>
 *  div: () => <div className="div">div</div>
 * }
 *
 * const items: RepeatItem<ProxyItemProps>[] = [
 *   { type: 'header', componentProp: 1 },
 *   { type: 'footer' },
 *   {
 *     type: 'div',
 *     for: [
 *       { type: 'div', },
 *       { type: 'div', },
 *     ],
 *   },
 * ]
 *
 * const renderWithNestedItems = <Repeat map={componentMap} for={items} flatten additional_prop />
 * // // render all nested arrays into first level array (like array.flat(Infinity))
 * // <React.Fragment>
 * //   <div className="header">header</div>
 * //   <div className="footer">footer</div>
 * //   <React.Fragment>
 * //     <div className="div">div</div>
 * //     <React.Fragment>
 * //       <div className="div">div</div>
 * //       <div className="div">div</div>
 * //     </React.Fragment>
 * //   </React.Fragment>
 * // </React.Fragment>
 */
export default function RepeatMap<
  ItemMap extends Record<string, any>,
>(props: RepeatMapProps<ItemMap>): JSX.Element | null {
  return <Repeat item={Component} {...props} />
}

RepeatMap.Items = Repeat
