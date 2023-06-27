import React from 'react'

// ---| components |---
import Icon from 'components/Icon'
import Text, { TextProps } from 'components/Text'
import Box, { BoxProps } from 'components/Box'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Banner.module.scss'

export type BannerProps = BoxProps & {
  className?: string
  children?: React.ReactNode
  src?: string
  title?: React.ReactNode
  titleType?: TextProps['type']
  subtitle?: React.ReactNode
  subtitleType?: TextProps['type']
  text?: React.ReactNode
  textType?: TextProps['type']
  loading?: boolean
  show?: boolean
}

/**
 * Component render banner with image and text.
 *
 * How to use
 * @example
 * <Banner
 *  src='error.jpg'
 *  title='Something happened'
 *  titleType='h2'
 *  text='description'
 *  textType='span'
 *  loading={isDataLoading}
 *  show={!data}
 * >
 *  Additional information
 * </Banner>
 */
export function Banner(props: BannerProps): JSX.Element | null {
  const { show = true, src, title, subtitle, text, titleType, subtitleType, textType, loading, children, className, ...otherProps } = props
  const _className = cn(css.Banner, className)

  if (!loading && !show) {
    return null
  }

  if (loading) {
    return (
      <Box className={_className} {...otherProps}>
        <Icon className={css.Spinner} type='sync' loading />
      </Box>
    )
  }

  return (
    <Box className={_className} {...otherProps}>
      {src && <img className={css.Image} src={src} />}

      {title && <Text.H2 weight={6} align='center' className={css.Title} type={titleType} text={title} />}
      {subtitle && <Text.H3 weight={4} align='center' className={css.Subtitle} type={subtitleType} text={subtitle} />}
      {text && <Text.Paragraph align='center' className={css.Text} type={textType} text={text} />}

      {children}
    </Box>
  )
}

Banner.displayName = 'Banner'

export default Banner
