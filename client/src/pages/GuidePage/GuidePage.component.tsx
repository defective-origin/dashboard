import React, { useEffect, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { useGuides, useGuideMutations, Guide } from 'api'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'
// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import { modal } from 'components/popups/Modal'
import Actions from 'components/actions/Actions'
import ConfirmModal from 'screens/modals/ConfirmModal'

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
export function GuidePage(props: GuidePageProps) {
  const { children, className, ...otherProps } = props
  const _className = cn(css.GuidePage, className)
  const [current, setCurrent] = useState<Guide>()
  const guides = useGuides()
  const mutations = useGuideMutations()
  // TODO: https://www.npmjs.com/package/tinymce

  useEffect(() => {
    if (guides.data) {
      setCurrent(guides.data[0])
    }
  }, [guides.data])

  return (
    <Page
      className={_className}
      name='LABEL.GUIDE'
      g='xs'
      p='xs'
      v='lcr'
      menu={[
        {
          start: 'visibility',
          active: current?.visible,
          tooltip: current?.visible ? t('ACTION.TURN_OFF') : t('ACTION.TURN_ON'),
          onClick: () => mutations.update({ ...current, visible: !current?.visible }),
        },
        { variant: 'divider', v: 'y' },
        { start: 'add', tooltip: t('ACTION.ADD_TOPIC') },
        { start: 'edit_square', tooltip: t('ACTION.EDIT') },
        {
          start: 'delete_forever',
          tooltip: t('ACTION.REMOVE'),
          onClick: () => modal({
            name: 'confirm',
            content: t('MESSAGE.REMOVE_CONFIRM'),
            onSuccess: () => mutations.remove(current),
          }),
        },
      ]}
      {...otherProps}
    >
      <Page.LeftAside className={css.Aside} width={400} p='xs'>
        <Text content='Topics' />

        <Actions
          v='y'
          size='xs'
          aligns='stretch'
          items={guides.data?.map(guide => ({ content: guide.name, style: { justifyContent: 'left' }, onClick: () => setCurrent(guide) }))}
        />
      </Page.LeftAside>

      <Page.Content className={css.Content} p='xs' g='sm' scroll='y'>
        <Text v='h2' content={current?.name} />

        {current?.content}
        {children}

        <ConfirmModal />
      </Page.Content>

      <Page.RightAside className={css.Aside} width={400} p='xs'>
        <Text content='Chapters' />

        <Actions
          v='y'
          size='xs'
          aligns='stretch'
          items={[
            { content: 'Title 1', style: { justifyContent: 'left' } },
            { content: 'Title 2', style: { justifyContent: 'left' } },
            { content: 'Title 3', style: { justifyContent: 'left' } },
            { content: 'Title 4', style: { justifyContent: 'left' } },
            { content: 'Title 5', style: { justifyContent: 'left' } },
            { content: 'Title 6', style: { justifyContent: 'left' } },
            { content: 'Title 7', style: { justifyContent: 'left' } },
            { content: 'Title 8', style: { justifyContent: 'left' } },
          ]}
        />
      </Page.RightAside>
    </Page>
  )
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
