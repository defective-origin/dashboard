import React from 'react'

import { RouteProps, useSystemLauncher } from 'Launcher'

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
  const system = useSystemLauncher()
  const title = system.t('PAGES.HOTKEYS')

  return (
    <Page
      className={_className}
      name={system.t('SYSTEM.TAB_NAME', { title })}
      title={title}
      {...otherProps}
    >
      <Page.Header>
        PAGE HEADER
      </Page.Header>
      <Page.Content>
        PAGE CONTENT
      </Page.Content>
      <Page.Footer>
        PAGE FOOTER
      </Page.Footer>
      <Page.LeftAside>
        PAGE LEFT ASIDE
      </Page.LeftAside>
      <Page.RightAside>
        PAGE RIGHT ASIDE
      </Page.RightAside>

      {children}
    </Page>
  )
}

HotKeysPage.displayName = 'HotKeysPage'

export default HotKeysPage
