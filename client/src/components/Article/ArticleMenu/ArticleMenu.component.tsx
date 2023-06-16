import React from 'react'

// ---| components |---
import Card, { CardProps } from 'components/Card'
import Menu, { MenuProps } from 'components/Menu'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './ArticleMenu.module.scss'

export type ArticleMenuOption = MenuProps

export type ArticleMenuProps = Omit<CardProps, 'title'> & {
  title?: React.ReactNode
  items?: ArticleMenuOption[]
  onClose?: () => void
}

export default function ArticleMenu(props: ArticleMenuProps): JSX.Element | null {
  const {
    title,
    items,
    className,
    children,
    onClose,
    ...otherProps
  } = props
  const _className = cn(css.ArticleMenu, className)

  return (
    <Card className={_className} stretch="xy" border="solid" divided {...otherProps}>
      <Card.Header text={title} onClose={onClose} />

      <Card.Content>
        <Menu items={items} itemsPadding="md" />
      </Card.Content>
    </Card>
  )
}
