import React from 'react'

// ---| components |---
import Scroll, { ScrollSizeTypes } from 'components/Scroll'
import Box, { BoxProps } from 'components/Box'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './ArticleContent.module.scss'

export type ArticleContentProps = BoxProps & {
  // content of article. It can be passed also via children
  content?: React.ReactNode
  // scroll bar size
  size?: ScrollSizeTypes
  // hovering title for up button
  upBtnTitle?: string
}

export default function ArticleContent(props: ArticleContentProps): JSX.Element {
  const {
    content,
    upBtnTitle,
    size = 'sm',
    className,
    children,
    ...otherProps
  } = props
  const _className = cn(css.ArticleContent, className)

  return (
    <Box className={_className} stretch="xy" position="absolute" {...otherProps}>
      <Scroll
        size={size}
        upBtnTitle={upBtnTitle}
        direction="y"
        buttons
      >
        <Box className={css.Content} width={size}>
          {content}
          {children}
        </Box>
      </Scroll>
    </Box>
  )
}
