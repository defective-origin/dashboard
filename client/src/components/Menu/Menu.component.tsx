import React, { useCallback } from 'react'

// ---| components |---
import Repeat from 'components/Repeat'
import Flex, { FlexProps } from 'components/Flex'
import Box, { BoxProps } from 'components/Box'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Menu.module.scss'
import MenuItem, { MenuItemProps } from './MenuItem'

export type MenuProps = BoxProps & MenuItemProps & {
  items?: MenuProps[]
  direction?: FlexProps['direction']
  itemsPadding?: FlexProps['padding']
  onClick?: (item: MenuProps) => void
}

export default function Menu(props: MenuProps): JSX.Element {
  const {
    text,
    href,
    items,
    itemsPadding,
    direction = 'y',
    className,
    children,
    onClick,
    ...otherProps
  } = props
  const _className = cn(css.Menu, className)
  const propsSelector = useCallback((props: MenuProps | MenuItemProps, isBlock: boolean): MenuProps | MenuItemProps => {
    return isBlock ? { ...props, itemsPadding } as MenuProps : props
  }, [itemsPadding])
  

  return (
    <Box className={_className} {...otherProps}>
      {text &&  <MenuItem className={css.Title} text={text} href={href} />}

      {(items?.length || children) && (
        <Flex className={css.Items} padded="x" padding={itemsPadding} direction={direction}>
          <Repeat block={Menu} item={MenuItem} for={items} selectProps={propsSelector} nested onClick={onClick} />
          {children}
        </Flex>
      )}
    </Box>
  )
}

Menu.Item = MenuItem
