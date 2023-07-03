import React from 'react'

import { RouteProps } from 'Launcher'

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

  return (
    <Page name='Hot Keys Page' className={_className} {...otherProps}>
      <Page.Header>
        <Page.Block style={{ height: '200px' }}>
          <Page.Block.Start><span>long long long long long long long long long long long long text</span></Page.Block.Start>
          <Page.Block.Center><span>2</span></Page.Block.Center>
          <Page.Block.End><span>3</span></Page.Block.End>
        </Page.Block>

        <Page.Block type='column' style={{ width: '200px' }}>
          <Page.Block.Start><span>long long long long long long long long long long long long text</span></Page.Block.Start>
          <Page.Block.Center><span>2</span></Page.Block.Center>
          <Page.Block.End><span>3</span></Page.Block.End>
        </Page.Block>
        <Page.Block type='row-center' style={{ height: '200px' }}>
          <Page.Block.Start><span>long long long long long long long long long long long long text</span></Page.Block.Start>
          <Page.Block.Center><span>2</span></Page.Block.Center>
          <Page.Block.End><span>3</span></Page.Block.End>
        </Page.Block>

        <Page.Block type='column-center' style={{ width: '200px' }}>
          <Page.Block.Start><span>long long long long long long long long long long long long text</span></Page.Block.Start>
          <Page.Block.Center><span>2</span></Page.Block.Center>
          <Page.Block.End><span>3</span></Page.Block.End>
        </Page.Block>
      </Page.Header>

      {children}
    </Page>
  )
}

HotKeysPage.displayName = 'HotKeysPage'

export default HotKeysPage
