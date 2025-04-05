import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'
import Repeat, { PropsWithItems } from 'components/layouts/Repeat'

// ---| self |---
import css from './Specs.module.scss'
import Spec, { SpecProps } from './Spec'

export type SpecsItem = SpecProps

export type SpecsProps = PropsWithItems<SpecsItem, BlockProps> & {
  vertical?: boolean
  size?: SpecProps['size']
  sep?: SpecProps['sep']
  placeholder?: SpecProps['placeholder']
}

/**
 * Show list of 'name: value' information.
 *
 * How to use
 * @example
 * <Specs items={items} />
 *
 * <Specs>
 *    <Specs.Item name='Name' content='bOotS' format='uppercase' size='xxs' />
 *    <Specs.Item name='Size' content={123456} format='weight' />
 * </Specs>
 */
export function Specs(props: SpecsProps): JSX.Element {
  const { vertical, justifies, items = [], size, sep, placeholder, children, className, ...otherProps } = props
  const _className = cn(css.Specs, className)

  return (
    <Block className={_className} {...otherProps}>
      <Repeat
        cmp={Spec}
        items={items}
        sep={sep}
        size={size}
        vertical={vertical}
        justifies={justifies}
        placeholder={placeholder}
      />

      {children}
    </Block>
  )
}

Specs.Item = Spec

Specs.displayName = 'Specs'

export default Specs
