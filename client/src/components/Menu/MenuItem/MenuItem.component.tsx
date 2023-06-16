import React from 'react'

// ---| components |---
import Text, { TextProps } from 'components/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './MenuItem.module.scss'

export type MenuItemProps = TextProps & {
  href?: string
}

export default function MenuItem(props: MenuItemProps): JSX.Element | null {
  const { className, ...otherProps } = props
  const _className = cn(css.MenuItem, className)

  return <Text.Link className={_className} {...otherProps} />
}
