import React, { useRef, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { BoardMarkup, useBoard, useBoardMutations } from 'api'
import { generateRouterPath, useNavigate, useParams } from 'router'

// ---| pages |---
import FeaturePage, { FEATURE_SNAPSHOT_ID, FeaturePageProps } from 'pages/FeaturePage'
// ---| screens |---
import Widget from 'screens/views/Widget'
import MarkupMenu from 'screens/views/MarkupMenu'
import MarkupBoard, { MarkupBoardManager } from 'screens/views/MarkupBoard'
// ---| components |---
import Menu from 'components/actions/Menu'
import { modal } from 'components/popups/Modal'

// ---| self |---
import css from './DashboardPage.module.scss'
import { useHistory } from 'hooks'


export type DashboardPageProps = FeaturePageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardPage />
 */
export function DashboardPage(props: DashboardPageProps) {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DashboardPage, className)
  const { id } = useParams()
  const navigate = useNavigate()
  const board = useBoard(id)
  const mutations = useBoardMutations()
  const [widget, setWidget] = useState<string>()
  const history = useHistory<BoardMarkup>()
  const manager = useRef<MarkupBoardManager>(null)

  // TODO: move update screen action to preview component instead of global menu

  // TODO: test fit_page_height grid_on
  // TODO: add change hotkeys / ctrl + Z, ctrl + shift + Z, ctrl + S, esc ...
  // TODO: merge features by parent field& Parent config fields have less priority [images, styles ...]

  // TODO: render sub board as widget too
  // TODO: create laptop markup by default

  // TODO: add spinner on loading to page component
  // TODO: remove from widgets only it there is no any markup
  // TODO: remove, replace for one and all markups buttons (modal window)
  // TODO: move to hook and add tests?
  // TODO: pay board and widgets on board
  // TODO: add to FORM width, height, row gap column gap

  return (
    <FeaturePage
      className={_className}
      options={board.data}
      nav={
        <MarkupMenu
          select={history.value}
          items={board.data?.markups}
          onSelect={history.reset}
          onSave={markups => mutations.update({ ...board.data, markups })}
        />
      }
      menu={[
        { start: 'undo', tooltip: t('ACTION.UNDO'), active: history.hasPrev, onClick: history.prev },
        { start: 'redo', tooltip: t('ACTION.REDO'), active: history.hasNext, onClick: history.next },
        { start: 'save', tooltip: t('ACTION.SAVE'), active: true },
        { start: 'view_apps', tooltip: t('ACTION.PREVIEW'), active: true },
        history.value?.height !== 'auto' && { start: 'fit_screen', tooltip: t('ACTION.EXPANDABLE'), active: true, onClick: () => manager.current?.resize('auto') },
        history.value?.height === 'auto' && { start: 'fit_screen', tooltip: t('ACTION.FIT_SCREEN'), onClick: () => manager.current?.resize('100%') },
        { start: 'dashboard_customize', tooltip: t('ACTION.ADD_WIDGET') },
        {
          start: 'remove_selection',
          tooltip: t('ACTION.CLEAR'),
          onClick: () => modal({
            name: 'confirm',
            content: t('MESSAGE.CONFIRM.CLEAR_BOARD'),
            onSuccess: manager.current?.clear,
          }),
        },
      ]}
      onRemove={() => {
        mutations.remove(board.data)
        navigate('BOARDS')
      }}
      onClone={() => console.log('CREATE CLONE')}
      {...otherProps}
    >
      <MarkupBoard
        ref={manager}
        id={FEATURE_SNAPSHOT_ID}
        className={css.Board}
        value={history.value}
        view={false} // TODO: fix
        items={board.data?.widgets}
        // onChange={options => mutations.update({ ...board.data, markups: board.data?.markups.map(m => m.width === options.width ? options : m) })}
        onChange={history.push}
        onError={error => console.log('handleError', error)}
        widget={id => (
          <Menu
            size='sm'
            horizontal
            v='top-start'
            items={[
              { start: 'settings', tooltip: t('ACTION.SETTINGS') },
              { start: 'resize', tooltip: t('ACTION.REPLACE'), onClick: () => manager.current?.placeItem(id) },
              { start: 'move_up', tooltip: t('ACTION.SUBSTITUTION'), onClick: () => manager.current?.replaceItem(id, '123') },
              { start: 'delete_forever', tooltip: t('ACTION.REMOVE'), onClick: () => manager.current?.removeItem(id) },
              { variant: 'divider', v: 'y' },
              { variant: 'link', tooltip: t('ACTION.OPEN_WIDGET'), href: generateRouterPath('WIDGET', { id }), target: '_blank' },
            ]}
            trigger={o => <Widget data-highlight={o.isOn} id={id} />}
          />
        )}
      />

      {children}
    </FeaturePage>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
