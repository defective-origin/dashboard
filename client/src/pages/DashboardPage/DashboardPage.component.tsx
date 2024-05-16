import React, { useCallback, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { useParams } from 'router'
import { useLocale } from 'locale'
import { useDashboard } from 'api'

// ---| pages |---
import BasePage, { BasePageProps } from 'pages/BasePage'

// ---| screens |---
// ---| components |---
import Board, { BoardItem } from 'components/Board'
import Widget from 'components/Widget'

// ---| self |---
import css from './DashboardPage.module.scss'

export type DashboardPageProps = BasePageProps


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
  const { id } = useParams()
  const board = useDashboard(id)
  const [mode, setMode] = useState<boolean | object>(false)
  const switchSelect = useCallback(() => setMode((flag) => !flag), [])
  const switchReselect = useCallback(() => setMode((flag) => !flag ? board?.widgets[0] : false), [])

  const handleSelect = (place: any) => {
    board.addWidget({ name: 'NEW WIDGET', place })
    switchSelect()
  }
  const handleReselect = (item: BoardItem) => board.updateWidget(item)
  const handleError = (error: any) => { console.log('handleError', error) }

  const actions = [
    { start: 'dashboard_customize', tooltip: locale.t('ACTION.ADD_WIDGET'), onClick: switchSelect },
    {
      start: 'computer', items: [
        { start: 'tv', content: locale.t('DEVICE.TV') },
        { start: 'computer', content: locale.t('DEVICE.COMPUTER') },
        { start: 'tablet_mac', content: locale.t('DEVICE.TABLET_VERTICAL') },
        { start: 'tablet_mac', content: locale.t('DEVICE.TABLET_HORIZONTAL') },
        { start: 'phone_iphone', content: locale.t('DEVICE.MOBILE_VERTICAL') },
        { start: 'phone_iphone', content: locale.t('DEVICE.MOBILE_HORIZONTAL') },
      ],
    },
    { start: 'beenhere', tooltip: locale.t('ACTION.ADD_TO_MENU') },
    { start: 'book', tooltip: locale.t('ACTION.DOCS') },
    { start: 'settings', tooltip: locale.t('ACTION.SETTINGS') },
    { start: 'delete', tooltip: locale.t('ACTION.REMOVE') },
  ]

  return (
    <BasePage className={_className} name={board?.name} actions={actions} noFooter {...otherProps}>
      {/* TODO: add spinner on loading to page component */}
      <Board
        className={_className}
        padding={8}
        rows={board.rows}
        columns={board.columns}
        items={board.widgets}
        select={mode as any}
        widget={Widget}
        onSelect={handleSelect}
        onReselect={handleReselect}
        onError={handleError}
      />

      {children}
    </BasePage>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
