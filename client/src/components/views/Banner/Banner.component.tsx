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

export type BannerVariant = 'empty' | 'error' | 401 | 403 | 404 | 500 | 502 | 503

export const BANNER_OPTION_MAP: Record<BannerVariant, {
  image: ImageVariant,
  title: React.ReactNode,
}> = {
  empty: { image: 'empty', title: 'NO DATA' },
  error: { image: 'error', title: 'ERROR' },
  401: { image: 400, title: 'ERROR' },
  403: { image: 400, title: 'ERROR' },
  404: { image: 400, title: 'ERROR' },
  500: { image: 500, title: 'ERROR' },
  502: { image: 500, title: 'ERROR' },
  503: { image: 500, title: 'ERROR' },
}

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
  v?: BannerVariant
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
    v = 'empty',
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
  const options = BANNER_OPTION_MAP[v]

  if (!visible && !loading) {
    return null
  }

  return (
    <Block className={_className} stretch {...otherProps}>
      <Progress className={css.Progress} visible={loading} />

      {!loading && (
        <Block className={cn(css.Content, contentClassName)}>
          <Image v={options.image} />

          {title && <Text.H4 align='center' color='primary' ellipsis content={title ?? options.title} />}
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
