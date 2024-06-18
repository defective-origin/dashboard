import React, { useCallback, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { useParams } from 'router'
import { useLocale } from 'locale'
import { useApp } from 'App'
import { useDashboard, Widget as WidgetType } from 'api'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import DashboardModalForm from 'screens/forms/DashboardModalForm'
import WidgetModalForm from 'screens/forms/WidgetModalForm'

// ---| components |---
import Board from 'components/Board'
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
  const [mode, setMode] = useState<boolean | WidgetType | undefined>(false)
  const switchSelect = useCallback(() => setMode((flag) => !flag), [])

  const handleSelect = (place: any) => {
    board.widgets.create({
      name: 'NEW WIDGET',
      place,
      id: 99,
      author: 0,
      access: 'PRIVATE',
      version: '0.0.0',
      image: 'https://shorturl.at/xJu8i',
    })
    switchSelect()
  }
  const handleReselect = (item: WidgetType) => {
    setMode(false)
    board.widgets.update(item)
  }
  const handleError = (error: any) => { console.log('handleError', error) }

  const actions = [
    { start: 'lightbulb', tooltip: 'Active', active: board.markup?.active },
    { start: 'dashboard_customize', tooltip: locale.t('ACTION.ADD_WIDGET'), onClick: switchSelect },
    { start: 'border_clear', tooltip: locale.t('ACTION.CLEAR'), onClick: () => board.clear() },
    {
      start: 'computer', items: [
        { start: 'tv', content: locale.t('DEVICE.TV'), active: board.isDevice('tv'), onClick: () => board.setDevice('tv') },
        { start: 'computer', content: locale.t('DEVICE.COMPUTER'), active: board.isDevice('computer'), onClick: () => board.setDevice('computer') },
        { start: 'tablet_mac', content: locale.t('DEVICE.TABLET'), active: board.isDevice('tablet'), onClick: () => board.setDevice('tablet') },
        { start: 'phone_iphone', content: locale.t('DEVICE.MOBILE'), active: board.isDevice('mobile'), onClick: () => board.setDevice('mobile') },
        { start: 'watch', content: locale.t('DEVICE.WATCH'), active: board.isDevice('watch'), onClick: () => board.setDevice('watch') },
      ],
    },
    { start: 'beenhere', tooltip: locale.t('ACTION.ADD_TO_MENU') },
    { start: 'settings', tooltip: locale.t('ACTION.SETTINGS'), onClick: () => app.modal({ name: 'board-settings' }) },
    { start: 'delete', tooltip: locale.t('ACTION.REMOVE') }, // TODO: remove board and remove markup[forbid to remove computer markup]
  ]

  return (
    <Page className={_className} name={board?.name} actions={actions} {...otherProps}>
      <Page.Content>
        {/* TODO: add spinner on loading to page component */}
        <Board
          padding={8}
          rows={board.markup?.rows}
          columns={board.markup?.columns}
          items={board.widgets}
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
                { start: 'close', tooltip: locale.t('ACTION.REMOVE'), onClick: () => board.widgets.remove(p.options.id) },
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
      <WidgetModalForm onSubmit={(patch) => patch && board.widgets.update(patch)} />

      {children}
    </Page>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
