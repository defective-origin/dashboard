import React, { useCallback, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { useParams } from 'router'
import { useLocale } from 'locale'
import { useApp } from 'App'
import { BoardDevice, BoardWidget, useDashboard } from 'api'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
// ---| components |---
import Board, { BoardItem } from 'components/Board'
import Widget from 'components/Widget'
import Menu from 'components/Menu'
import Modal from 'components/Modal'

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
  const locale = useLocale()
  const app = useApp()
  const { id } = useParams()
  const board = useDashboard(id)
  const [device, setDevice] = useState<BoardDevice>('computer')
  const [mode, setMode] = useState<boolean | BoardWidget | undefined>(false)
  const switchSelect = useCallback(() => setMode((flag) => !flag), [])

  const handleSelect = (place: any) => {
    board.addWidget(device, {
      name: 'NEW WIDGET', place,
      id: 99,
      docs: 'link.com',
      author: 'author@email.com',
      version: '0.0.1',
      origin: 0,
      // TODO: destruct origin and attach origin Id. By default show data in form from origin
    })
    switchSelect()
  }
  const handleReselect = (item: BoardItem) => {
    setMode(false)
    board.updateWidget(device, item)
  }
  const handleError = (error: any) => { console.log('handleError', error) }

  const actions = [
    { start: 'dashboard_customize', tooltip: locale.t('ACTION.ADD_WIDGET'), onClick: switchSelect },
    {
      start: 'computer', items: [
        { start: 'tv', content: locale.t('DEVICE.TV'), active: device === 'tv', onClick: () => setDevice('tv') },
        { start: 'computer', content: locale.t('DEVICE.COMPUTER'), active: device === 'computer', onClick: () => setDevice('computer') },
        { start: 'tablet_mac', content: locale.t('DEVICE.TABLET'), active: device === 'tablet', onClick: () => setDevice('tablet') },
        { start: 'phone_iphone', content: locale.t('DEVICE.MOBILE'), active: device === 'mobile', onClick: () => setDevice('mobile') },
      ],
    },
    { start: 'beenhere', tooltip: locale.t('ACTION.ADD_TO_MENU') },
    { start: 'settings', tooltip: locale.t('ACTION.SETTINGS'), onClick: () => app.modal({ name: 'board-settings' }) },
    { start: 'delete', tooltip: locale.t('ACTION.REMOVE') }, // TODO: remove board and remove markup[forbid to remove computer markup]
  ]

  return (
    <Page className={_className} name={board?.name} actions={actions} noFooter {...otherProps}>
      <Page.Content>
        {/* TODO: add spinner on loading to page component */}
        <Board
          padding={8}
          rows={board.markup(device)?.rows}
          columns={board.markup(device)?.columns}
          items={board.markup(device)?.widgets}
          select={mode}
          widget={(p) => (
            <Menu
              horizontal
              v='top-start'
              items={[
                { start: 'resize', tooltip: locale.t('ACTION.REPLACE'), onClick: () => setMode(p.options) },
                { start: 'zoom_out_map', tooltip: locale.t('ACTION.FULL_SCREEN') },
                { start: 'favorite', tooltip: locale.t('ACTION.FAVORITE') },
                { start: 'book', tooltip: locale.t('ACTION.DOCS') },
                { start: 'settings', tooltip: locale.t('ACTION.SETTINGS'), onClick: () => app.modal({ name: 'widget-settings' }) },
                { start: 'close', tooltip: locale.t('ACTION.REMOVE'), onClick: () => board.removeWidget(device, p.options.id) },
                // TODO: replace one widget to another
              ]}
              trigger={(o) => <Widget active={o.open} {...p} />}
            />
          )}
          onSelect={handleSelect}
          onReselect={handleReselect}
          onError={handleError}
        />
      </Page.Content>

      <Modal name='widget-settings' title='Widget settings' v='right' />
      <Modal name='board-settings' title='Dashboard settings' v='right' />

      {children}
    </Page>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
