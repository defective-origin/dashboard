import React from 'react'

// ---| core |---
import { cn, react, jss } from 'tools'
import { DIRECTION, Direction } from 'theme'

// ---| components |---
import Item, { ItemOptions, useItem } from 'components/layouts/Item'

// ---| self |---
import './Block.module.scss'


export type FlexVariants = Direction | 'cards' | 'flex'
export const FLEX_VARIANTS = new Set([...DIRECTION, 'cards', 'flex'])
export type FlexOptions = {
  v?: FlexVariants
  /** align items */
  aligns?: React.CSSProperties['alignItems']
  /** justify content */
  justifies?: React.CSSProperties['justifyContent']
  /** flex direction */
  direction?: React.CSSProperties['flexDirection']
  /** flex wrap */
  wrap?: React.CSSProperties['flexWrap']
  /** flex flow */
  flow?: React.CSSProperties['flexFlow']
}

export type GridOptions = {
  v?: 'grid' | 'board' | 'row' | 'rows' | 'column' | 'columns' | 'top' | 'bottom' | 'left' | 'right' | 'lcr' | 'lc' | 'cr' | 'tcb' | 'tc' | 'cb'
  /** quantity of columns or columns template */
  columns?: number | string
  /** quantity of rows or rows template */
  rows?: number | string
  /** grid template */
  template?: string
  /** grid template areas */
  areas?: React.CSSProperties['gridTemplateAreas']
  /** place items */
  places?: React.CSSProperties['placeItems']
  /** align items */
  aligns?: React.CSSProperties['alignItems']
  /** justify items */
  justifies?: React.CSSProperties['justifyItems']
  /** grid auto flow */
  flow?: React.CSSProperties['gridAutoFlow']
  /** grid auto columns and grid auto rows: `1fr` `1fr 2fr` */
  cells?: React.CSSProperties['gridAutoColumns'] | `${React.CSSProperties['gridAutoColumns']} ${React.CSSProperties['gridAutoRows']}`
}

export type BlockOptions = ItemOptions & (FlexOptions | GridOptions) // TODO: fix variant highlight wrong fields
export type BlockProps<E extends React.ElementType = React.ElementType> = react.CustomTagProps<BlockOptions, E>

/**
 * Flex and Grid orientation component.
 * Allows to work with flex and grid items.
 * @example
 * // flex
 * <Block g='md' p='md' v="xy">
 *  <Item />
 *  <Item />
 *  <Item />
 * </Block>
 * 
 * // grid markup
 * <Block>
 *  <Item />
 *  <Item area='2/2' />
 *  <Item area='3/3' />
 *  <Block area='4/4' />
 *  <Block area='5/5' />
 * </Block>
 *
 * // markup
 * <Block>
 *  <Item area='top' />
 *  <Item area='left' />
 *  <Item area='content' />
 *  <Block area='right' />
 *  <Block area='bottom' />
 * </Block>
 * // or via preset components
 * <Block>
 *  <Header />
 *  <Left />
 *  <Content />
 *  <Right />
 *  <Footer />
 * </Block>
 */
export function Block<E extends React.ElementType = 'div'>(props: BlockProps<E>) {
  const { as: Tag = 'div', v = 'y', className, ...afterItem } = useItem(props)

  if (FLEX_VARIANTS.has(v)) {
    const { aligns, justifies, direction, wrap, flow, ...otherOptions } = afterItem

    return (
      <Tag
        className={cn('block', {
          [`block--${v}`]: v,
        }, jss({
          alignItems: aligns,
          justifyContent: justifies,
          flexDirection: direction,
          flexWrap: wrap,
          flexFlow: flow,
        }), className)}
        {...otherOptions}
      />
    )
  }


  const { areas, aligns, places, justifies, template, flow, cells, columns, rows, ...otherOptions } = afterItem as GridOptions
  const auto = cells?.toString().split(' ')

  return (
    <Tag
      className={cn('block', {
        [`block--${v}`]: !areas && v,
      }, jss({
        placeItems: places,
        alignItems: aligns,
        justifyItems: justifies,
        gridTemplate: template,
        gridTemplateAreas: areas,
        gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
        gridTemplateRows: typeof rows ==='number' ? `repeat(${rows}, 1fr)` : rows,
        gridAutoColumns: auto?.[0],
        gridAutoRows: auto?.[1],
        gridAutoFlow: flow,
      }), className)}
      {...otherOptions}
    />
  )
}

Block.displayName = 'Block'

Block.Item = Item

export default Block
