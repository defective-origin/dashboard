import React from 'react'

// ---| components |---
import Text from 'components/Text'
import Image, { ImageVariant } from 'components/Image'
import Progress from 'components/Progress'
import Block from 'components/Block'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Banner.module.scss'

export type BannerProps = {
  className?: string
  children?: React.ReactNode
  imageSrc?: string
  imageType?: ImageVariant
  title?: React.ReactNode
  subtitle?: React.ReactNode
  text?: React.ReactNode
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
  const {
    show = true,
    imageSrc,
    imageType,
    title,
    subtitle,
    text,
    loading,
    children,
    className,
    ...otherProps
  } = props
  const _className = cn(css.Banner, className)

  if (!loading && !show) {
    return null
  }

  if (loading) {
    return (
      <div className={_className} {...otherProps}>
        <Progress className={css.Progress} show />
      </div>
    )
  }

  return (
    <Block className={_className} direction='y' {...otherProps}>
      {imageSrc || imageType && <Image className={css.Image} src={imageSrc} v={imageType} />}

      {title && <Text.H4 align='center' className={css.Title} status='primary' content={title} />}
      {subtitle && <Text.H5 align='center' className={css.Subtitle} status='primary' content={subtitle} />}
      {text && <Text.Body1 align='center' className={css.Text} status='primary' content={text} />}

      {children}
    </Block>
  )
}

Banner.displayName = 'Banner'

export default Banner
