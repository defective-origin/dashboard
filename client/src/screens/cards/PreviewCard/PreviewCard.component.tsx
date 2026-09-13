import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { useFunc } from 'hooks'
import { Feature, useBookmark } from 'api'
import { AppLink, AppLinkProps, AppLinkVariant } from 'router'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Label from 'components/views/Label'
import Card from 'components/layouts/Card'
import Block from 'components/layouts/Block'
import Button from 'components/actions/Button'

// ---| self |---
import css from './PreviewCard.module.scss'

export type PreviewCardProps<V extends AppLinkVariant> = AppLinkProps<V> & {
  options?: Feature
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 * @example
 * <PreviewCard />
 */
export function PreviewCard<V extends AppLinkVariant>(props: PreviewCardProps<V>) {
  const { options, children, className, ...otherProps } = props
  const bookmark = useBookmark(options?.id)

  const toggleBookmark = useFunc((event: React.MouseEvent) => {
    event.preventDefault()
    bookmark.toggle(options)
  })

  return (
    <AppLink className={cn(css.PreviewCard, className)} v='wrapper' {...otherProps}>
      <Card v='y'>
        <Card.Header g='xxs' p='sm' justifies='space-between' aligns='center'>
          <Text content={options?.name} size='xs' />
          <Button start='beenhere' size='sm' active={bookmark.isOn} onClick={toggleBookmark} />
        </Card.Header>

        {children && (
          <Card.Content>
            {children}
          </Card.Content>
        )}

        <Card.Media height={300} width='100%' src='https://i.pinimg.com/736x/4e/8c/21/4e8c211774adefa4ca67d77e6eabd031.jpg' />

        <Block v='x' g='xxs' className={css.Meta}>
          <Label icon='star' content={options?.rate} format='number' tooltip={t('LABEL.RATE')} />
          <Label icon='payments' content={options?.price} format='currency' tooltip={t('LABEL.PRICE')} />
          <Label icon='schedule' content={options?.updatedAt} format='day-of-month-year' tooltip={t('LABEL.LAST_UPDATE')} />
        </Block>
      </Card>
    </AppLink>
  )
}

PreviewCard.displayName = 'PreviewCard'

export default PreviewCard
