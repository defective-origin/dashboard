import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Text from 'components/views/Text'
import Image, { ImageVariant } from 'components/views/Image'
import Progress from 'components/views/Progress'
import Block from 'components/layouts/Block'

// ---| self |---
import css from './Banner.module.scss'

export type BannerProps = {
  className?: string
  contentClassName?: string
  children?: React.ReactNode
  title?: React.ReactNode
  subtitle?: React.ReactNode
  text?: React.ReactNode
  absolute?: boolean
  loading?: boolean
  visible?: boolean
  image?: ImageVariant,
  // TODO: add size
}

/**
 * Component render banner with image and text.
 *
 * How to use
 * @example
 * <Banner
 *  src='error.jpg'
 *  title='Something happened'
 *  text='description'
 *  loading={isDataLoading}
 *  visible={!data}
 * >
 *  Additional information
 * </Banner>
 */
export function Banner(props: BannerProps) {
  const {
    image,
    loading,
    visible = true,
    title,
    subtitle,
    text,
    absolute,
    children,
    className,
    contentClassName,
    ...otherProps
  } = props
  const _className = cn(css.Banner, { [css.Absolute]: absolute }, className)
  // TODO: move to screens but what about table banner? use global theme context?

  if (!visible && !loading) {
    return null
  }

  return (
    <Block className={_className} stretch {...otherProps}>
      <Progress className={css.Progress} visible={loading} />

      {!loading && (
        <Block className={cn(css.Content, contentClassName)}>
          <Image v={image} />

          {title && <Text.H4 align='center' color='primary' ellipsis content={title} />}
          {subtitle && <Text.H5 align='center' color='primary' ellipsis content={subtitle} />}
          {text && <Text.Body1 align='center' color='primary' content={text} />}

          {children}
        </Block>
      )}
    </Block>
  )
}

Banner.displayName = 'Banner'

export default Banner
