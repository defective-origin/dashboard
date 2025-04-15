import React from 'react'

// ---| core |---
import { TranslateKeys, t } from 'locale'
import { cn } from 'tools'

// ---| pages |---
import Page from 'pages/Page'
// ---| screens |---
// ---| components |---
import { ImageVariant } from 'components/views/Image'
import Banner from 'components/views/Banner'

// ---| self |---
import css from './BannerPage.module.scss'

export type BannerVariant = 'empty' | 'greeting' | 'error' | 401 | 403 | 404 | 500 | 502 | 503

export const BANNER_PAGE_MAP: Record<BannerVariant, {
  title: TranslateKeys,
  subtitle?: TranslateKeys,
  text?: TranslateKeys,
  image?: ImageVariant,
}> = {
  empty: { image: 'empty', title: 'MESSAGE.NO_DATA' },
  greeting: { title: 'MESSAGE.GREETING', subtitle: 'MESSAGE.READ_GUIDE' },
  error: { image: 'error', title: 'MESSAGE.ERROR.SOMETHING_WRONG', subtitle: 'MESSAGE.ERROR.SOME_ISSUE' },
  401: { image: 400, title: 'MESSAGE.ERROR.NOT_AUTHORIZED', subtitle: 'MESSAGE.ERROR.NOT_PASS' },
  403: { image: 400, title: 'MESSAGE.ERROR.HAVE_NO_PERMISSION', subtitle: 'MESSAGE.ERROR.NOT_PASS' },
  404: { image: 400, title: 'MESSAGE.ERROR.PAGE_NOT_FOUND', subtitle: 'MESSAGE.ERROR.NOT_EXIST' },
  500: { image: 500, title: 'MESSAGE.ERROR.SERVER_ERROR', subtitle: 'MESSAGE.ERROR.SOME_ISSUE' },
  502: { image: 500, title: 'MESSAGE.ERROR.BAD_GATEWAY', subtitle: 'MESSAGE.ERROR.SOME_ISSUE' },
  503: { image: 500, title: 'MESSAGE.ERROR.SERVICE_UNAVAILABLE', subtitle: 'MESSAGE.ERROR.SOME_ISSUE' },
}

export type BannerPageProps = {
  className?: string
  children?: React.ReactNode
  v?: BannerVariant
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <BannerPage />
 */
export function BannerPage(props: BannerPageProps) {
  const { v = 'empty', children, className, ...otherProps } = props
  const _className = cn(css.BannerPage, className)
  const status = BANNER_PAGE_MAP[v]

  return (
    <Page className={_className} {...otherProps}>
      <Page.Content>
        <Banner
          className={css.Banner}
          title={t(status.title)?.toUpperCase()}
          subtitle={t(status.subtitle)}
          text={t(status.text)}
          image={status.image}
        >
          {children}
        </Banner>
      </Page.Content>
    </Page>
  )
}

BannerPage.displayName = 'BannerPage'

export default BannerPage
