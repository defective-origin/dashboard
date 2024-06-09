import React, { useCallback, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { useParams } from 'router'
import { useLocale } from 'locale'
import { useApp } from 'App'
import { DashboardDevice, DashboardWidget, useDashboard } from 'api'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import DashboardModalForm from 'screens/forms/DashboardModalForm'
import WidgetModalForm from 'screens/forms/WidgetModalForm'

// ---| components |---
import Board, { BoardItem } from 'components/Board'
import Widget from 'components/Widget'
import Menu from 'components/Menu'

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
  // TODO: move to useDashboard and setDevice after loading by active flag
  const [device, setDevice] = useState<DashboardDevice>('COMPUTER')
  const [mode, setMode] = useState<boolean | DashboardWidget | undefined>(false)
  const switchSelect = useCallback(() => setMode((flag) => !flag), [])

  const handleSelect = (place: any) => {
    board.addWidget(device, {
      name: 'NEW WIDGET',
      place,
      id: 99,
      author: 0,
      access: 'PRIVATE',
      version: '0.0.0',
    })
    switchSelect()
  }
  const handleReselect = (item: BoardItem) => {
    setMode(false)
    board.updateWidget(device, item)
  }
  const handleError = (error: any) => { console.log('handleError', error) }

  const actions = [
    { start: 'lightbulb', tooltip: 'Active', active: board.markup(device)?.active },
    { start: 'dashboard_customize', tooltip: locale.t('ACTION.ADD_WIDGET'), onClick: switchSelect },
    { start: 'border_clear', tooltip: locale.t('ACTION.CLEAR'), onClick: () => board.clear(device) },
    {
      start: 'computer', items: [
        { start: 'tv', content: locale.t('DEVICE.TV'), active: device === 'TV', onClick: () => setDevice('TV') },
        { start: 'computer', content: locale.t('DEVICE.COMPUTER'), active: device === 'COMPUTER', onClick: () => setDevice('COMPUTER') },
        { start: 'tablet_mac', content: locale.t('DEVICE.TABLET'), active: device === 'TABLET', onClick: () => setDevice('TABLET') },
        { start: 'phone_iphone', content: locale.t('DEVICE.MOBILE'), active: device === 'MOBILE', onClick: () => setDevice('MOBILE') },
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
                { start: 'move_up', tooltip: locale.t('ACTION.SUBSTITUTION') },
                { start: 'zoom_out_map', tooltip: locale.t('ACTION.FULL_SCREEN') },
                { start: 'favorite', tooltip: locale.t('ACTION.FAVORITE') },
                { start: 'book', tooltip: locale.t('ACTION.DOCS') },
                { start: 'settings', tooltip: locale.t('ACTION.SETTINGS'), onClick: () => app.modal({ name: 'widget-settings', payload: p.options }) },
                { start: 'close', tooltip: locale.t('ACTION.REMOVE'), onClick: () => board.removeWidget(device, p.options.id) },
              ]}
              trigger={(o) => <Widget active={o.open} {...p} />}
            />
          )}
          onSelect={handleSelect}
          onReselect={handleReselect}
          onError={handleError}
        />
      </Page.Content>

      <DashboardModalForm payload={board} onSubmit={(patch) => patch && board.update(patch)} />
      <WidgetModalForm onSubmit={(patch) => patch && board.updateWidget(device, patch)} />

      {children}
    </Page>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
