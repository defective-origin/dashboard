import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'

// ---| screens |---
// ---| components |---
import Item, { ItemProps } from 'components/layouts/Item'
import Text from 'components/views/Text'

// ---| self |---
import css from './PlaceholderCard.module.scss'

export type PlaceholderCardProps = ItemProps & {
  name?: string
}

/**
 * Component description.
 * @example
 * <PlaceholderCard />
 */
export function PlaceholderCard(props: PlaceholderCardProps) {
  const { name = 'COMPONENT', children, className, ...otherProps } = props

  return (
    <Item className={cn(css.PlaceholderCard, className)} p='xl' {...otherProps}>
      <Text
        className={css.Message}
        color='secondary'
        format='capitalize'
        content={t('MESSAGE.UNDER_CONSTRUCTION', { name })}
      />

      {children}
    </Item>
  )
}

PlaceholderCard.displayName = 'PlaceholderCard'

export default PlaceholderCard
