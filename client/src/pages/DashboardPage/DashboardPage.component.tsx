import React, { useCallback, useMemo, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { useParams } from 'router'
import { t } from 'locale'
import { useApp } from 'App'
import { BoardMarkupSize, BoardItem, useBoard, useBoardMutations } from 'api'

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
  const app = useApp()
  const { id } = useParams()
  const board = useBoard(id)
  const boardMutations = useBoardMutations()
  const [markupSize, setMarkupSize] = useState<BoardMarkupSize>('COMPUTER')
  const markup = useMemo(() => board.data?.markups.find(markup => markup.size === markupSize), [board.data?.markups, markupSize])
  const [mode, setMode] = useState<boolean | BoardItem | undefined>(false)
  const switchSelect = useCallback(() => setMode(flag => !flag), [])

  const isMarkupActive = (size: BoardMarkupSize) => board.data?.markups.find(m => m.size === size)
  const clear = () => {
    if (markup?.items && board.data) {
      boardMutations.update.mutateAsync({
        ...board.data,
        markups: board.data.markups.map(m => m.size === markup.size ? { ...markup, items: [] } : m),
      })
      markup.items = []
      // response.update(response.data)
    }
  }

  const updateMarkup = (place: any) => {}
  const addMarkupWidget = (place: any) => {}
  const updateMarkupWidget = (place: any) => {}
  const removeMarkupWidget = (id: string) => {}

  const handleSelect = (place: any) => {
    // board.widgets.create({
    //   name: 'NEW WIDGET',
    //   place,
    //   id: 99,
    //   author: 0,
    //   access: 'PRIVATE',
    //   version: '0.0.0',
    // })
    switchSelect()
  }
  const handleReselect = (item: BoardItem) => {
    setMode(false)
    // board.widgets.update(item)
  }
  const handleError = (error: any) => { console.log('handleError', error) }

  const actions = [
    { start: 'lightbulb', tooltip: 'Active', active: markup?.active },
    { start: 'dashboard_customize', tooltip: t('ACTION.ADD_WIDGET'), onClick: switchSelect },
    { start: 'border_clear', tooltip: t('ACTION.CLEAR'), onClick: clear },
    {
      start: 'computer', items: [
        { start: 'tv', content: t('DEVICE.TV'), active: isMarkupActive('INFINITY'), onClick: () => setMarkupSize('INFINITY') },
        { start: 'tv', content: t('DEVICE.TV'), active: isMarkupActive('TV'), onClick: () => setMarkupSize('TV') },
        { start: 'computer', content: t('DEVICE.COMPUTER'), active: isMarkupActive('COMPUTER'), onClick: () => setMarkupSize('COMPUTER') },
        { start: 'computer', content: t('DEVICE.COMPUTER'), active: isMarkupActive('LAPTOP'), onClick: () => setMarkupSize('LAPTOP') },
        { start: 'tablet_mac', content: t('DEVICE.TABLET'), active: isMarkupActive('TABLET'), onClick: () => setMarkupSize('TABLET') },
        { start: 'phone_iphone', content: t('DEVICE.MOBILE'), active: isMarkupActive('MOBILE'), onClick: () => setMarkupSize('MOBILE') },
        { start: 'watch', content: t('DEVICE.WATCH'), active: isMarkupActive('WATCH'), onClick: () => setMarkupSize('WATCH') },
      ],
    },
    { start: 'download', tooltip: t('ACTION.INSTALL') },
    { start: 'beenhere', tooltip: t('ACTION.ADD_TO_MENU') },
    { start: 'settings', tooltip: t('ACTION.SETTINGS'), onClick: () => app.modal({ name: 'board-settings' }) },
  ]

  return (
    <Page className={_className} name={board.data?.name} actions={actions} {...otherProps}>
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
                { start: 'zoom_out_map', tooltip: t('ACTION.FULL_SCREEN') },
                { start: 'download', tooltip: t('ACTION.INSTALL') },
                { start: 'favorite', tooltip: t('ACTION.FAVORITE') },
                { start: 'book', tooltip: t('ACTION.DOCS') },
                { start: 'settings', tooltip: t('ACTION.SETTINGS'), onClick: () => app.modal({ name: 'widget-settings', payload: p.options }) },
                { start: 'close', tooltip: t('ACTION.REMOVE'), onClick: () => removeMarkupWidget(p.options.id) },
              ]}
              trigger={o => <Widget active={o.open} {...p} />}
            />
          )}
        />
      </Page.Content>

      <DashboardModalForm payload={board.data} onSubmit={patch => patch && board.update(patch)} />
      <WidgetModalForm onSubmit={patch => patch && board.widgets.update(patch)} />

      {children}
    </Page>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
