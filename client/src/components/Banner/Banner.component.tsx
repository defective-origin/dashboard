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
  loading?: boolean
  show?: boolean
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
 *  show={!data}
 * >
 *  Additional information
 * </Banner>
 */
export function Banner(props: BannerProps): JSX.Element | null {
  const {
    v = 'empty',
    show = true,
    title,
    subtitle,
    text,
    loading,
    children,
    className,
    contentClassName,
    ...otherProps
  } = props
  const _className = cn(css.Banner, className)
  const options = BANNER_OPTION_MAP[v]

  if (!show) {
    return null
  }

  return (
    <Block className={_className} stretch {...otherProps}>
      <Progress className={css.Progress} show={loading} />

      {!loading && (
        <Block className={cn(css.Content, contentClassName)} direction='y'>
          <Image v={options.image} />

          {title && <Text.H4 align='center' color='primary' content={title ?? options.title} />}
          {subtitle && <Text.H5 align='center' color='primary' content={subtitle} />}
          {text && <Text.Body1 align='center' color='primary' content={text} multiline />}

          {children}
        </Block>
      )}
    </Block>
  )
}

Banner.displayName = 'Banner'

export default Banner
