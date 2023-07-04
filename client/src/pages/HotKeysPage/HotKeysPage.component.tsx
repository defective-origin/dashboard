import React from 'react'

import { RouteProps, useLocaleProvider } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Page, { PageProps } from 'components/Page'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './HotKeysPage.module.scss'

export type HotKeysPageProps = RouteProps & PageProps & {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <HotKeysPage />
 */
export function HotKeysPage(props: HotKeysPageProps): JSX.Element {
  const { navigate, children, className, ...otherProps } = props
  const _className = cn(css.HotKeysPage, className)
  const locale = useLocaleProvider()
  const title = locale.t('PAGES.HOTKEYS')

  return (
    <Page
      name={locale.t('SYSTEM.TAB_NAME', { title })}
      title={title}
      className={_className}
      {...otherProps}
    >

      <div>TEST CONTENT</div>
      <div>TEST CONTENT</div>
      <div>TEST CONTENT</div>
      <div>TEST CONTENT</div>
      <div>TEST CONTENT</div>
      <div>TEST CONTENT</div>
      <Page.Footer>
            FOOTER
      </Page.Footer>
      <Page.LeftAside>
            LEFT ASIDE
      </Page.LeftAside>
      <Page.RightAside>
            RIGHT ASIDE
      </Page.RightAside>
      <Page.RightAside>
            -------------------
      </Page.RightAside>
      <Page.RightAside>
            CONTENT
      </Page.RightAside>

      {children}
    </Page>
  )
}

HotKeysPage.displayName = 'HotKeysPage'

export default HotKeysPage
