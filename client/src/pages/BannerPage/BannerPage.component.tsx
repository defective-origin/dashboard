import React from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'
import { TranslateKeys } from 'locale'

// ---| pages |---
// ---| screens |---
import Page from 'screens/Page'

// ---| components |---
import Banner, { BannerVariant } from 'components/Banner'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './BannerPage.module.scss'

export const BANNER_PAGE_MAP: Record<BannerVariant, {
  title: TranslateKeys,
  subtitle: TranslateKeys,
  text?: TranslateKeys,
}> = {
  empty: { title: 'BANNER.EMPTY.TITLE', subtitle: 'BANNER.EMPTY.SUBTITLE', text: 'BANNER.EMPTY.TEXT' },
  error: { title: 'BANNER.ERROR.TITLE', subtitle: 'BANNER.ERROR.SUBTITLE' },
  401: { title: 'BANNER.401.TITLE', subtitle: 'BANNER.401.SUBTITLE' },
  403: { title: 'BANNER.403.TITLE', subtitle: 'BANNER.403.SUBTITLE' },
  404: { title: 'BANNER.404.TITLE', subtitle: 'BANNER.404.SUBTITLE' },
  500: { title: 'BANNER.500.TITLE', subtitle: 'BANNER.500.SUBTITLE' },
  502: { title: 'BANNER.502.TITLE', subtitle: 'BANNER.502.SUBTITLE' },
  503: { title: 'BANNER.503.TITLE', subtitle: 'BANNER.503.SUBTITLE' },
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
export function BannerPage(props: BannerPageProps): JSX.Element {
  const { v = 'empty', children, className, ...otherProps } = props
  const _className = cn(css.BannerPage, className)
  const app = useLauncher()
  const status = BANNER_PAGE_MAP[v]

  return (
    <Page className={_className} {...otherProps}>
      <Banner
        className={css.Banner}
        title={app.t(status.title)}
        subtitle={app.t(status.subtitle)}
        text={app.t(status.text)}
        v={v}
      >
        {children}
      </Banner>
    </Page>
  )
}

BannerPage.displayName = 'BannerPage'

export default BannerPage
