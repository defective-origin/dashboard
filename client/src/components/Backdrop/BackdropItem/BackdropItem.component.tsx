import React, { useCallback } from 'react'

// ---| components |---
import Box, { BoxProps } from 'components/Box'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './BackdropItem.module.scss'

export type BackdropItemProps = BoxProps

export default function BackdropItem(props: BackdropItemProps): JSX.Element | null {
  const {
    placement = 'right',
    className,
    children,
    ...otherProps
  } = props
  const _className = cn(css.BackdropItem, className)
  const stopBubbling = useCallback((event: React.MouseEvent) => event.stopPropagation(), [])

  return (
    <Box
      className={_className}
      zIndex={1}
      position="absolute"
      placement={placement}
      onClick={stopBubbling}
      {...otherProps}
    >
      {children}
    </Box>
  )
}
