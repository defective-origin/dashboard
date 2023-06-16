import React from 'react'

// ---| components |---
import Button, { ButtonSizeTypes } from 'components/Button'
import Box, { BoxProps } from 'components/Box'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './ArticleNavigation.module.scss'

export type ArticleNavigationProps = BoxProps & {
  // size buttons
  size?: ButtonSizeTypes
  // hovering title for previous page button
  prevBtnTitle?: string
  // turn on prev button and add handler
  onPrevClick?: () => void
  // hovering title for next page button
  nextBtnTitle?: string
  // turn on next button and add handler
  onNextClick?: () => void
  // hovering title for menu button
  menuBtnTitle?: string
  // turn on menu button and add handler
  onMenuClick?: () => void
}

export default function ArticleNavigation(props: ArticleNavigationProps): JSX.Element {
  const {
    size = 'sm',
    prevBtnTitle,
    onPrevClick,
    nextBtnTitle,
    onNextClick,
    menuBtnTitle,
    onMenuClick,
    className,
    ...otherProps
  } = props
  const _className = cn(css.ArticleNavigation, className)

  return (
    <Box className={_className} stretch="xy" position='absolute' placement='stretch' {...otherProps}>
      {onNextClick && (
        <Button
          className={css.NextPageButton}
          title={nextBtnTitle}
          size={size}
          icon="keyboard_arrow_right"
          onClick={onNextClick}
        />
      )}

      {onPrevClick && (
        <Button
          className={css.PrevPageButton}
          title={prevBtnTitle}
          size={size}
          icon="keyboard_arrow_left"
          onClick={onPrevClick}
        />
      )}

      {onMenuClick && (
        <Button
          className={css.MenuButton}
          title={menuBtnTitle}
          size={size}
          icon="menu"
          onClick={onMenuClick}
        />
      )}
    </Box>
  )
}
