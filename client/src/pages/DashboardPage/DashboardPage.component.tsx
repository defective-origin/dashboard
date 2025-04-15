import React, { useRef, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { useHistory } from 'hooks'
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
import Popup from 'components/popups/Popup'
import Button from 'components/actions/Button'
import { modal } from 'components/popups/Modal'
import { SelectField } from 'components/forms/fields/SelectField'
import { CssSizeField } from 'components/forms/fields/CssSizeField'

// ---| self |---
import css from './DashboardPage.module.scss'


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

  // TODO: move update screen action to preview component instead of global menu OR DO AUTOMATICALLY ON SAVE

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
  // TODO: remove clone for array and matrix?
  // TODO: change row size, gaps on fly
  // TODO: mergeFeature on backend side?
  // TODO: get maxNearest? and resize board
  // TODO: by default you can play with settings but cannot to save it
  // TODO: add view feature and move snapshot and other there?
  // TODO: forbid widget cloning to prevent stilling data and copy-pasting (add to docs) only nesting it's prevent circle deps
  // TODO: create layout search
  // TODO: add branching history
  // TODO: save only diff in options
  // TODO: rename boars to layouts or markups?
  // TODO: everything in app is like chain of diffs. just clone and override for testing (add to docs) All parents changes will be applied for nested too
  // TODO: commit, link, join, list_alt icon or just border + highlight item:row:column
  // TODO: highlight([row, column, item, join]) unhighlight([row, column, item, join]), resize(), reset([row, column, item, join])
  // TODO: кнопка автоподстройки лаяута
  // TODO: Open preview in new TAB or FULL SCREEN
  // TODO: Page Not Found - гномы воруют электричество и выносят сервера
  // TODO: Если при перемещении виджета кликнуть на занятое место, то они меняются местами
  // TODO: add button connect config
  // TODO: add state config like options
  // TODO: выровнятть интерфейсы
  // TODO: add section space_dashboard, window, team_dashboard, auto_awesome_mosaic


  const HEIGHT_SELECT_ITEMS = [
    { value: 'auto', children: t('ACTION.FIT_CONTENT') },
    { value: '100%', children: t('ACTION.FIT_SCREEN') },
  ]

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
        // { start: 'undo', tooltip: t('ACTION.UNDO'), active: history.hasPrev, onClick: history.prev },
        // { start: 'redo', tooltip: t('ACTION.REDO'), active: history.hasNext, onClick: history.next },
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
        <Popup
          arrow
          title={t('LABEL.GRID')}
          actions={o => [
            { content: t('ACTION.SAVE'), start: 'save', color: 'success' },
            { content: t('ACTION.CLOSE'), start: 'close', onClick: o.off },
          ]}
          trigger={o => (
            <Button
              className={_className}
              size='sm'
              start='space_dashboard'
              tooltip={t('LABEL.GRID')}
              active={o.isOn}
              onClick={o.toggle}
            />
          )}
          disableHoverListener
        >
          {/* TODO: create GapField */}
          <CssSizeField label={t('LABEL.WIDTH')} value={history.value?.width.toString()} formats={['px']} disabled />
          <SelectField label={t('LABEL.HEIGHT')} items={HEIGHT_SELECT_ITEMS} value={history.value?.height} onChange={manager.current?.resize} />
          <CssSizeField label={t('LABEL.GAP')} />
        </Popup>,
      ]}
      onRemove={() => {
        mutations.remove(board.data)
        navigate('BOARDS')
      }}
      onClone={() => console.log('CREATE CLONE')}
      onInherit={() => console.log('INHERIT')}
      {...otherProps}
    >
      <MarkupBoard
        ref={manager} // TODO: create context instead
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
            size='xs'
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
            trigger={() => <Widget id={id} />}
          />
        )}
      />

      {children}
    </FeaturePage>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
