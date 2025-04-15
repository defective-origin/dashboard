import React, { useCallback, useMemo, useState } from 'react'

// ---| core |---
import { cn, xy } from 'tools'
import { generateRouterPath, useNavigate, useParams } from 'router'
import { t } from 'locale'
import { BoardMarkupDevice, BoardItem, useBoard, useBoardMutations } from 'api'

// ---| pages |---
import FeaturePage, { FEATURE_SNAPSHOT_ID, FeaturePageProps } from 'pages/FeaturePage'
// ---| screens |---
// ---| components |---
import Board from 'components/Board'
import Menu from 'components/actions/Menu'
import Widget from 'components/views/Widget'
import { modal } from 'components/popups/Modal'
import ButtonGroup from 'components/actions/ButtonGroup'

// ---| self |---
import css from './DashboardPage.module.scss'

export type DashboardPageProps = FeaturePageProps

const SNAPSHOT_ID = 'SNAPSHOT'

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
  const [markupDevice, setMarkupDevice] = useState<BoardMarkupDevice>('COMPUTER')
  const markup = useMemo(() => board.data?.markups.find(markup => markup.device === markupDevice), [board.data?.markups, markupDevice])
  const mutations = useBoardMutations(id, markup?.id)
  const [mode, setMode] = useState<boolean | BoardItem | undefined>(false)
  const switchSelect = useCallback(() => setMode(flag => !flag), [])

  const isMarkupActive = (device: BoardMarkupDevice) => board.data?.markups.find(m => m.device === device)?.visible
  const activateMarkup = () => mutations.markup.update({ ...markup, visible: !markup?.visible })
  const expandMarkup = () => mutations.markup.update({ ...markup, expandable: !markup?.expandable })

  const handleSelect = (place: xy.Square) => {
    mutations.widget.create({ ...place, widget: { id: '000000000bebd4f7c72b8e3a' } })

    switchSelect()
  }
  const handleReselect = (item: BoardItem) => {
    mutations.widget.update(item)

    setMode(false)
  }
  const handleError = (error: any) => { console.log('handleError', error) }

  // TODO: add change hotkeys / ctrl + Z, ctrl + shift + Z, ctrl + S
  // TODO: add action hotkeys / add widget ...
  // TODO: show has new changes Icon

  return (
    <FeaturePage
      className={_className}
      options={board.data}
      nav={
        <ButtonGroup
          className={css.Devices}
          items={[
            { start: 'high_quality', tooltip: t('DEVICE.BOARD'), active: isMarkupActive('BOARD'), onClick: () => setMarkupDevice('BOARD') },
            { start: 'live_tv', tooltip: t('DEVICE.TV'), active: isMarkupActive('TV'), onClick: () => setMarkupDevice('TV') },
            { start: 'desktop_windows', tooltip: t('DEVICE.COMPUTER'), active: isMarkupActive('COMPUTER'), onClick: () => setMarkupDevice('COMPUTER') },
            { start: 'laptop_chromebook', tooltip: t('DEVICE.LAPTOP'), active: isMarkupActive('LAPTOP'), onClick: () => setMarkupDevice('LAPTOP') },
            { start: 'tablet_mac', tooltip: t('DEVICE.TABLET'), active: isMarkupActive('TABLET'), onClick: () => setMarkupDevice('TABLET') },
            { start: 'phone_iphone', tooltip: t('DEVICE.MOBILE'), active: isMarkupActive('MOBILE'), onClick: () => setMarkupDevice('MOBILE') },
            { start: 'watch', tooltip: t('DEVICE.WATCH'), active: isMarkupActive('WATCH'), onClick: () => setMarkupDevice('WATCH') },
          ]}
        />
      }
      menu={[
        { start: 'slideshow', tooltip: 'View mode', active: true },
        { start: 'visibility', tooltip: markup?.visible ? t('ACTION.TURN_OFF') : t('ACTION.TURN_ON'), active: markup?.visible, onClick: activateMarkup },
        { start: 'fit_screen', tooltip: markup?.expandable ? t('ACTION.EXPANDABLE') : t('ACTION.FIT_SCREEN'), active: markup?.expandable, onClick: expandMarkup },
        { start: 'refresh', tooltip: 'Refresh', onClick: () => board.refetch() },
        { variant: 'divider', v: 'y', height: 20 },
        { start: 'dashboard_customize', tooltip: t('ACTION.ADD_WIDGET'), onClick: switchSelect },
        {
          start: 'remove_selection',
          tooltip: t('ACTION.CLEAR'),
          onClick: () => modal({
            name: 'confirm',
            content: t('MESSAGE.CLEAR_BOARD_CONFIRM'),
            onSuccess: () => mutations.markup.update({ ...markup, items: [] }),
          }),
        },
      ]}
      onRemove={() => {
        mutations.remove(board.data)
        navigate('BOARDS') // TODO: pay board and widgets on board
      }}
      {...otherProps}
    >
      {/* TODO: add spinner on loading to page component */}
      <Board
        id={FEATURE_SNAPSHOT_ID}
        padding={8}
        rows={markup?.rows}
        columns={markup?.columns}
        items={markup?.items}
        select={mode}
        onSelect={handleSelect}
        onReselect={handleReselect}
        onError={handleError}
        widget={p => (
          <Menu
            size='sm'
            horizontal
            v='top-start'
            items={[
              { start: 'settings', tooltip: t('ACTION.SETTINGS') },
              { start: 'resize', tooltip: t('ACTION.REPLACE'), onClick: () => setMode(p.options) },
              { start: 'move_up', tooltip: t('ACTION.SUBSTITUTION') },
              {
                start: 'delete_forever',
                tooltip: t('ACTION.REMOVE'),
                onClick: () => modal({
                  name: 'confirm',
                  content: t('MESSAGE.REMOVE_CONFIRM'),
                  onSuccess: () => mutations.widget.remove(p.options),
                }),
              },
              { variant: 'divider', v: 'y' },
              { variant: 'link', tooltip: t('ACTION.OPEN_WIDGET'), href: generateRouterPath('WIDGET', { id: p.options.id }), target: '_blank' },
            ]}
            trigger={o => <Widget active={o.open} {...p} />}
          />
        )}
      />
      {children}
    </FeaturePage>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
