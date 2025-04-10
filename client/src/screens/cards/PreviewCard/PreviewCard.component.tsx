import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Feature } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Label from 'components/views/Label'
import Image from 'components/views/Image'
import Block from 'components/layouts/Block'
import NavLink, { NavLinkProps, NavLinkVariant } from 'components/actions/NavLink'

// ---| self |---
import css from './PreviewCard.module.scss'

export type PreviewCardProps<V extends NavLinkVariant> = NavLinkProps<V> & {
  options?: Feature
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <PreviewCard />
 */
export function PreviewCard<V extends NavLinkVariant,>(props: PreviewCardProps<V>): JSX.Element {
  const { options, children, className, ...otherProps } = props
  const _className = cn(css.PreviewCard, className)

  return (
    <NavLink className={_className} clear {...otherProps}>
      <Text v='h4' content={options?.name} />
      <Image src='https://i.pinimg.com/736x/4e/8c/21/4e8c211774adefa4ca67d77e6eabd031.jpg' width='100%' height={200} />
      <Block className={css.Meta} v='x' g='xxs' p='xxs'>
        <Label icon='star' content={options?.rate} format='number' />
        <Label icon='payments' content={options?.price} format='currency' />
      </Block>

      {children}
    </NavLink>
  )
}

PreviewCard.displayName = 'PreviewCard'

export default PreviewCard
