import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Meta } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'
import Image from 'components/Image'
import NavLink, { NavLinkProps, NavLinkVariant } from 'components/NavLink'

// ---| self |---
import css from './PreviewCard.module.scss'

export type PreviewCardProps<V extends NavLinkVariant> = NavLinkProps<V> & {
  options?: Meta
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
      <Image src={options?.image} width='100%' height={200} />
      <Text v='h4' content={options?.name} />
      <Text v='caption' content={options?.price} format='currency' size='xxs' />

      {children}
    </NavLink>
  )
}

PreviewCard.displayName = 'PreviewCard'

export default PreviewCard
