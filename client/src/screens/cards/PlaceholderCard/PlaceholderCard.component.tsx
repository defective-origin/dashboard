import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'

// ---| pages |---
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
 *
 * How to use
 * @example
 * <PlaceholderCard />
 */
export function PlaceholderCard(props: PlaceholderCardProps) {
  const { name = 'COMPONENT', children, className, ...otherProps } = props
  const _className = cn(css.PlaceholderCard, className)

  return (
    <Item className={_className} p='xl' {...otherProps}>
      <Text.Body2
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
