import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Media from 'components/views/Media'
import Aside from 'components/layouts/Aside'
import Header from 'components/layouts/Header'
import Footer from 'components/layouts//Footer'
import Content from 'components/layouts/Content'
import Actions from 'components/layouts/Actions'
import Divider from 'components/layouts/Divider'
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './Card.module.scss'


export type CardProps = BlockProps & {
  divided?: boolean
}

/**
 * Component description.
 * @example
 * <Card />
 */
export const Card = (props: CardProps) => { // TODO: add stories
  const { divided, children, className, ...otherProps } = props

  // TODO: divide by [role='header'], [role='footer']
  return (
    <Block as='article' className={cn(css.Card, divided && css.divided, className)} {...otherProps}>
      {children}
    </Block>
  )
}

Card.displayName = 'Card'

Card.Media = Media
Card.Aside = Aside
Card.Footer = Footer
Card.Header = Header
Card.Content = Content
Card.Actions = Actions
Card.Divider = Divider

export default Card
