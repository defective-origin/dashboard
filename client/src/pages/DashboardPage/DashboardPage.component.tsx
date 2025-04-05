import React, { useCallback, useMemo, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { useParams } from 'router'
import { t } from 'locale'
import { useApp } from 'App'
import { BoardMarkupDevice, BoardItem, useBoard, useBoardMutations } from 'api'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import ReviewsModal from 'screens/modals/ReviewsModal'
import WidgetModal from 'screens/modals/WidgetModal'
import DashboardModal from 'screens/modals/DashboardModal'

// ---| components |---
import Board from 'components/Board'
import Widget from 'components/views/Widget'
import Menu from 'components/actions/Menu'
import ButtonGroup from 'components/actions/ButtonGroup'

// ---| self |---
import css from './DashboardPage.module.scss'

export type DashboardPageProps = PageProps


/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardPage />
 */
export function DashboardPage(props: DashboardPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DashboardPage, className)
  const app = useApp()
  const { id } = useParams()
  const board = useBoard(id)
  const [markupDevice, setMarkupDevice] = useState<BoardMarkupDevice>('COMPUTER')
  const markup = useMemo(() => board.data?.markups.find(markup => markup.device === markupDevice), [board.data?.markups, markupDevice])
  const boardMutations = useBoardMutations(id, markup?.id)
  const [mode, setMode] = useState<boolean | BoardItem | undefined>(false)
  const switchSelect = useCallback(() => setMode(flag => !flag), [])

  const isMarkupActive = (device: BoardMarkupDevice) => board.data?.markups.find(m => m.device === device)?.visible
  const clear = () => boardMutations.updateMarkup.mutateAsync({ ...markup, items: [] })
  const activateMarkup = () => boardMutations.updateMarkup.mutateAsync({ ...markup, visible: !markup?.visible })
  const expandMarkup = () => boardMutations.updateMarkup.mutateAsync({ ...markup, expandable: !markup?.expandable })
  const removeMarkupWidget = (id: string) => boardMutations.removeWidget.mutateAsync({ id })

  const handleSelect = (place: any) => {
    boardMutations.createWidget.mutateAsync({ ...place, widget: { id: '000000000bebd4f7c72b8e3a' } })

    switchSelect()
  }
  const handleReselect = (item: BoardItem) => {
    boardMutations.updateWidget.mutateAsync(item)

    setMode(false)
  }
  const handleError = (error: any) => { console.log('handleError', error) }

  return (
    <Page
      className={_className}
      name={board.data?.name}
      nav={
        <ButtonGroup items={[
          { start: 'high_quality', tooltip: t('DEVICE.BOARD'), active: isMarkupActive('BOARD'), onClick: () => setMarkupDevice('BOARD') },
          { start: 'live_tv', tooltip: t('DEVICE.TV'), active: isMarkupActive('TV'), onClick: () => setMarkupDevice('TV') },
          { start: 'desktop_windows', tooltip: t('DEVICE.COMPUTER'), active: isMarkupActive('COMPUTER'), onClick: () => setMarkupDevice('COMPUTER') },
          { start: 'laptop_chromebook', tooltip: t('DEVICE.LAPTOP'), active: isMarkupActive('LAPTOP'), onClick: () => setMarkupDevice('LAPTOP') },
          { start: 'tablet_mac', tooltip: t('DEVICE.TABLET'), active: isMarkupActive('TABLET'), onClick: () => setMarkupDevice('TABLET') },
          { start: 'phone_iphone', tooltip: t('DEVICE.MOBILE'), active: isMarkupActive('MOBILE'), onClick: () => setMarkupDevice('MOBILE') },
          { start: 'watch', tooltip: t('DEVICE.WATCH'), active: isMarkupActive('WATCH'), onClick: () => setMarkupDevice('WATCH') },
        ]} />
      }
      menu={[
        { start: 'visibility', tooltip: markup?.visible ? t('ACTION.TURN_OFF') : t('ACTION.TURN_ON'), active: markup?.visible, onClick: activateMarkup },
        { start: 'fit_screen', tooltip: markup?.expandable ? t('ACTION.EXPANDABLE') : t('ACTION.FIT_SCREEN'), active: markup?.expandable, onClick: expandMarkup },
        { start: 'remove_selection', tooltip: t('ACTION.CLEAR'), onClick: clear },
        { start: 'dashboard_customize', tooltip: t('ACTION.ADD_WIDGET'), onClick: switchSelect },
        { start: 'download', tooltip: t('ACTION.INSTALL') },
        { start: 'beenhere', tooltip: t('ACTION.ADD_BOOKMARK') },
        { start: 'settings', tooltip: t('ACTION.SETTINGS'), onClick: () => app.modal({ name: DashboardModal.modalName, payload: board.data }) },
        { start: 'delete_forever', tooltip: t('ACTION.REMOVE') },
        { start: 'payments', tooltip: t('ACTION.PAY') }, // TODO: pay board and widgets on board
        { start: 'reviews', tooltip: t('ACTION.REVIEWS'), onClick: () => app.modal({ name: ReviewsModal.modalName, payload: board.data?.reviews }) },
      ]}
      {...otherProps}
    >
      <Page.Content>
        {/* TODO: add spinner on loading to page component */}
        <Board
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
                { start: 'resize', tooltip: t('ACTION.REPLACE'), onClick: () => setMode(p.options) },
                { start: 'move_up', tooltip: t('ACTION.SUBSTITUTION') },
                { start: 'download', tooltip: t('ACTION.INSTALL') },
                { start: 'beenhere', tooltip: t('ACTION.ADD_BOOKMARK') },
                { start: 'settings', tooltip: t('ACTION.SETTINGS'), onClick: () => app.modal({ name: WidgetModal.modalName, payload: p.options }) },
                { start: 'delete_forever', tooltip: t('ACTION.REMOVE'), onClick: () => removeMarkupWidget(p.options.id) },
              ]}
              trigger={o => <Widget active={o.open} {...p} />}
            />
          )}
        />
      </Page.Content>

      <WidgetModal />
      <DashboardModal />
      <ReviewsModal />

      {children}
    </Page>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
