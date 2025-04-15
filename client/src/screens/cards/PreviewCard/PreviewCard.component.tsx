import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { useFunc } from 'hooks'
import { Feature, useBookmark } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Label from 'components/views/Label'
import Card from 'components/layouts/Card'
import Block from 'components/layouts/Block'
import Button from 'components/actions/Button'
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
export function PreviewCard<V extends NavLinkVariant,>(props: PreviewCardProps<V>) {
  const { options, children, className, ...otherProps } = props
  const _className = cn(css.PreviewCard, className)
  const bookmark = useBookmark(options?.id)

  const toggleBookmark = useFunc((event: React.MouseEvent) => {
    event.preventDefault()
    bookmark.toggle(options)
  })

  return (
    <NavLink className={_className} clear {...otherProps}>
      <Card>
        <Card.Content style={{ height: '-webkit-fill-available' }}>
          <Block v='x' g='xxs' justifies='space-between' aligns='center'>
            <Text content={options?.name} size='xs' />
            <Button start='beenhere' size='sm' active={bookmark.isOn} onClick={toggleBookmark} />
          </Block>

          <Block v='x' g='xxs' className={css.Meta}>
            <Label icon='star' content={options?.rate} format='number' tooltip={t('LABEL.RATE')} />
            <Label icon='payments' content={options?.price} format='currency' tooltip={t('LABEL.PRICE')} />
            <Label icon='schedule' content={options?.updatedAt} format='day-of-month-year' tooltip={t('LABEL.LAST_UPDATE')} />
          </Block>

          {children}
        </Card.Content>

        <Card.Media component='img' image='https://i.pinimg.com/736x/4e/8c/21/4e8c211774adefa4ca67d77e6eabd031.jpg' sx={{ height: 300 }} />
      </Card>
    </NavLink>
  )
}

PreviewCard.displayName = 'PreviewCard'

export default PreviewCard
