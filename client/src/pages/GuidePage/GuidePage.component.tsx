import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { useSubscribedState } from 'hooks'
import { useGuides, useGuideMutations } from 'api'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'
// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Button from 'components/actions/Button'
import { modal } from 'components/popups/Modal'
import Actions from 'components/layouts/Actions'
import ConfirmModal from 'screens/modals/ConfirmModal'

// ---| self |---
import css from './GuidePage.module.scss'


export type GuidePageProps = PageProps

/**
 * Component description.
 * @example
 * <GuidePage />
 */
export function GuidePage(props: GuidePageProps) {
  const { children, className, ...otherProps } = props
  const guides = useGuides()
  const [current, setCurrent] = useSubscribedState(guides.data?.[0])
  const mutations = useGuideMutations()
  // TODO: https://www.npmjs.com/package/tinymce

  // TODO: https://mui.com/x/react-tree-view/

  return (
    <Page
      className={cn(css.GuidePage, className)}
      name='LABEL.GUIDE'
      g='xs'
      p='xs'
      v='lcr'
      extra={[
        <Button start='add' tooltip={t('ACTION.CREATE_NEW')} />,
        <Button start='edit_square' tooltip={t('ACTION.EDIT')} />,
        <Button start='delete_forever' tooltip={t('ACTION.REMOVE')} onClick={() => modal({
          name: 'confirm',
          content: t('MESSAGE.CONFIRM.REMOVE'),
          onSuccess: () => mutations.remove(current),
        })} />,
      ]}
      {...otherProps}
    >
      <Page.LeftAside className={css.Aside} width={400} p='xs'>
        <Text content='Topics' />

        <Actions v='y' size='xs' aligns='stretch' >
          {guides.data?.map(guide => (
            <Button
              content={guide.name}
              active={current?.id === guide.id}
              end={
                <Button
                  size='xs'
                  start='visibility'
                  active={guide?.disabled}
                  tooltip={guide?.disabled ? t('ACTION.TURN_OFF') : t('ACTION.TURN_ON')}
                  onClick={event => {
                    event.stopPropagation()
                    mutations.update({ ...guide, disabled: !guide?.disabled })
                  }}
                />
              }
              style={{ justifyContent: 'left' }}
              onClick={() => setCurrent(guide)}
            />
          ))}
        </Actions>
      </Page.LeftAside>

      <Page.Content className={css.Content} v='grid' p='xs' g='sm' scroll='y'>
        <Text v='h2' content={current?.name} />

        {current?.content}
        {children}

        <ConfirmModal />
      </Page.Content>

      <Page.RightAside className={css.Aside} width={400} p='xs'>
        <Text content='Chapters' />

        <Actions v='y' size='xs' aligns='stretch'>
          <Actions.Button content='Title 1' style={{ justifyContent: 'left' }} />
          <Actions.Button content='Title 2' style={{ justifyContent: 'left' }} />
          <Actions.Button content='Title 3' style={{ justifyContent: 'left' }} />
          <Actions.Button content='Title 4' style={{ justifyContent: 'left' }} />
          <Actions.Button content='Title 5' style={{ justifyContent: 'left' }} />
          <Actions.Button content='Title 6' style={{ justifyContent: 'left' }} />
          <Actions.Button content='Title 7' style={{ justifyContent: 'left' }} />
          <Actions.Button content='Title 8' style={{ justifyContent: 'left' }} />
        </Actions>
      </Page.RightAside>
    </Page>
  )
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
