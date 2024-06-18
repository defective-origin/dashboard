import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
// ---| components |---
import Text from 'components/Text'
import Image from 'components/Image'
import Block from 'components/Block'
import Actions from 'components/Actions'

// ---| self |---
import css from './GuidePage.module.scss'

export type GuidePageProps = PageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <GuidePage />
 */
export function GuidePage(props: GuidePageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.GuidePage, className)
  const style = { justifyContent: 'left' }

  return (
    <Page className={_className} name='PAGES.GUIDE' {...otherProps}>
      <Page.LeftAside width={400} p='xs'>
        <Text content='Content' />

        <Actions
          v='y'
          size='xs'
          aligns='stretch'
          items={[
            { content: 'Title 1', style },
            { content: 'Title 2', style },
            { content: 'Title 3', style },
            { content: 'Title 4', style },
            { content: 'Title 5', style },
            { content: 'Title 6', style },
            { content: 'Title 7', style },
            { content: 'Title 8', style },
          ]}
        />
      </Page.LeftAside>

      <Page.Content p='xs' g='sm' scroll='y'>
        <Text v='h2' content='Topic' />

        <Block height='min-content'>
          <Text v='h3' content='Title 1' />
          <Text v='body2' content={'content '.repeat(50)} />
          <Image width='100%' height={300} />
        </Block>

        <Block height='min-content'>
          <Text v='h3' content='Title 2' />
          <Text v='body2' content={'content '.repeat(50)} />
          <Image width='100%' height={300} />
        </Block>

        <Block height='min-content'>
          <Text v='h3' content='Title 3' />
          <Text v='body2' content={'content '.repeat(50)} />
          <Image width='100%' height={300} />
        </Block>

        <Block height='min-content'>
          <Text v='h3' content='Title 4' />
          <Text v='body2' content={'content '.repeat(50)} />
          <Image width='100%' height={300} />
        </Block>

        <Block height='min-content'>
          <Text v='h3' content='Title 5' />
          <Text v='body2' content={'content '.repeat(50)} />
          <Image width='100%' height={300} />
        </Block>

        <Block height='min-content'>
          <Text v='h3' content='Title 6' />
          <Text v='body2' content={'content '.repeat(50)} />
          <Image width='100%' height={300} />
        </Block>

        <Block height='min-content'>
          <Text v='h3' content='Title 7' />
          <Text v='body2' content={'content '.repeat(50)} />
          <Image width='100%' height={300} />
        </Block>

        <Block height='min-content'>
          <Text v='h3' content='Title 8' />
          <Text v='body2' content={'content '.repeat(50)} />
          <Image width='100%' height={300} />
        </Block>

        {children}
      </Page.Content>

      <Page.RightAside width={400} p='xs'>
        <Text content='Topics' />

        <Actions
          v='y'
          size='xs'
          aligns='stretch'
          items={[
            { content: 'Topic 1', style },
            { content: 'Topic 2', style },
            { content: 'Topic 3', style },
            { content: 'Topic 4', style },
            { content: 'Topic 5', style },
            { content: 'Topic 6', style },
            { content: 'Topic 7', style },
            { content: 'Topic 8', style },
          ]}
        />
      </Page.RightAside>
    </Page>
  )
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
