import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useLocale } from 'locale'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Item, { ItemProps } from 'components/Item'
import Text from 'components/Text'

// ---| self |---
import css from './PlaceholderCard.module.scss'

export type PlaceholderCardProps = ItemProps & {
  name?: string
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <PlaceholderCard />
 */
export function PlaceholderCard(props: PlaceholderCardProps): JSX.Element {
  const { name = 'COMPONENT', children, className, ...otherProps } = props
  const _className = cn(css.PlaceholderCard, className)
  const locale = useLocale()

  return (
    <Item className={_className} p='xl' {...otherProps}>
      <Text.Body2
        className={css.Message}
        color='secondary'
        format='capitalize'
        content={locale.t('MESSAGES.UNDER_CONSTRUCTION', { name })}
      />

      {children}
    </Item>
  )
}

PlaceholderCard.displayName = 'PlaceholderCard'

export default PlaceholderCard
