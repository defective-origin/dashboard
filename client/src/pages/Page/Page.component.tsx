import React from 'react'

// ---| core |---
import { TranslateKeys, TranslateKeysOrStr, t } from 'locale'
import { cn, react } from 'tools'
import { useAccount } from 'api'

// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Portal from 'components/layouts/Portal'
import Meta, { MetaItem } from 'components/Meta'
import Actions from 'components/layouts/Actions'
import Avatar from 'components/views/Avatar'
import Dropdown from 'components/actions/Dropdown'
import Item from 'components/layouts/Item'
import Aside from 'components/layouts/Aside'
import Block, { BlockProps } from 'components/layouts/Block'
import Content from 'components/layouts/Content'
import Footer from 'components/layouts/Footer'
import Header from 'components/layouts/Header'
import Section from 'components/layouts/Section'

// ---| self |---
import css from './Page.module.scss'


export type PageProps = BlockProps & {
  name?: TranslateKeysOrStr
  meta?: MetaItem[]
  title?: React.ReactNode
  extra?: React.ReactNode
  nav?: React.ReactNode
}

/**
 * Component description.
 * @example
 * <Page />
 */
export function Page(props: PageProps) {
  const { title, nav, extra, name, meta, children, className, ...otherProps } = props
  const pageName = t(name as TranslateKeys)
  const account = useAccount()

  return (
    <Block className={cn(css.Page, className)} v='columns' {...otherProps}>
      <Meta title={pageName} items={meta} />

      <Portal name='page-name' content={<Text v='h1' size='lg' color='primary' content={title ?? pageName} />} />
      <Portal name='page-nav' content={nav} />
      <Portal name='page-extra' content={
        <Actions g='xxs' size='sm' aligns='center'>
          {extra}

          <Dropdown arrow popupSide='bottom-end' trigger={<Avatar src={account.user.data?.image} size='md' />}>
            {account.isAuthorized
              ? <Actions.Button start='logout' content={t('ACTION.LOGIN')} onClick={account.logout} />
              : <Actions.Button start='login' content={t('ACTION.LOGOUT')} onClick={account.login} />
            }
          </Dropdown>
        </Actions>
      } />

      {children}
    </Block>
  )
}

// TODO: leave only private case components? like sections? sliders? Or remove at all?
export default react.attachComponents(Page, {
  Item,
  Footer,
  Header,
  Content,
  Section,
  Block,
  LeftAside: Aside.Left,
  RightAside: Aside.Right,
})
